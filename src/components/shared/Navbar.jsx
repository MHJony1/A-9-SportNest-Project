'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaChevronDown,
  FaSignOutAlt,
  FaCalendarCheck,
  FaHome,
  FaPlusSquare,
} from 'react-icons/fa';
import { MdSportsSoccer, MdOutlineManageAccounts } from 'react-icons/md';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

// NAV LINKS CONFIGURATION WITH MATCHING ICONS
const PUBLIC_LINKS = [
  { label: 'Home', href: '/', icon: <FaHome size={16} /> },
  {
    label: 'All Facilities',
    href: '/all-facilities',
    icon: <MdSportsSoccer size={18} />,
  },
];

const PRIVATE_LINKS = [
  {
    label: 'My Bookings',
    href: '/my-bookings',
    icon: <FaCalendarCheck size={15} />,
  },
  {
    label: 'Add Facility',
    href: '/add-facilities',
    icon: <FaPlusSquare size={15} />,
  },
  {
    label: 'Manage Facilities',
    href: '/manage-facilities',
    icon: <MdOutlineManageAccounts size={19} />,
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Real authentication state monitoring via Better Auth Hook
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // UI Interactive States
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Dynamic Route Construction based on login authentication state
  const currentNavLinks = user
    ? [...PUBLIC_LINKS, ...PRIVATE_LINKS]
    : PUBLIC_LINKS;

  // Handle scroll detection to switch background matrix smoothly
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close profile dropdown when clicking outside the target scope
  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Secure Sign-Out Functionality Handler
  const handleLogout = async () => {
    try {
      setProfileOpen(false);
      setDrawerOpen(false);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/');
            router.refresh();
          },
        },
      });
    } catch (err) {
      console.error('Sign out execution error:', err);
    }
  };

  return (
    <>
      {/* ══════════════ STICKY NAVBAR CONTAINER ══════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'p-2 sm:p-3' : 'p-4 sm:p-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto h-20 px-5 sm:px-8 flex items-center justify-between gap-4 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-zinc-950/85 backdrop-blur-xl border border-zinc-900/60 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* ─── LOGO SEGMENT ─── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-[#a3e635] flex items-center justify-center shadow-[0_0_16px_rgba(163,230,53,0.35)] group-hover:shadow-[0_0_24px_rgba(163,230,53,0.55)] transition-shadow duration-300">
              <MdSportsSoccer className="text-black text-xl" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase leading-none">
              Play<span className="text-[#a3e635]">Nest</span>
            </span>
          </Link>

          {/* ─── DESKTOP NAVIGATION LINKS (Conditional Rendering Filter) ─── */}
          <nav className="hidden lg:flex items-center gap-1">
            {currentNavLinks.map(({ label, href, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg group ${
                    isActive
                      ? 'text-[#a3e635]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`${isActive ? 'text-[#a3e635]' : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`}
                  >
                    {icon}
                  </span>
                  <span>{label}</span>

                  {isActive && (
                    <span className="absolute -bottom-3.5 left-3 right-3 h-0.5 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ─── RIGHT CONTROLS: AUTH CONDITIONAL TRIGGER ─── */}
          <div className="flex items-center gap-3" ref={profileRef}>
            {user ? (
              <div className="relative">
                {/* Profile Active Capsule Trigger */}
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2.5 py-1.5 focus:outline-none group select-none cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center overflow-hidden shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#a3e635] flex items-center justify-center text-black font-black text-xs">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="hidden sm:flex flex-col items-start text-left max-w-30">
                    <span className="text-zinc-300 text-xs font-black truncate w-full group-hover:text-white transition-colors">
                      {user.name}
                    </span>
                    <span className="text-zinc-500 text-[10px] font-semibold truncate w-full">
                      {user.email}
                    </span>
                  </div>

                  <FaChevronDown
                    size={9}
                    className={`text-zinc-600 transition-transform duration-200 ${profileOpen ? 'rotate-180 text-white' : ''}`}
                  />
                </button>

                {/* ─── DESKTOP DROP CONTAINER ─── */}
                <div
                  className={`absolute right-0 top-[calc(100%+14px)] w-56 bg-[#09090b] border border-zinc-900 rounded-xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-200 origin-top-right z-50 ${
                    profileOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    {PRIVATE_LINKS.map(({ label, href, icon }) => {
                      const isDropdownActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all group ${
                            isDropdownActive
                              ? 'text-[#a3e635] bg-zinc-900/60'
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                          }`}
                        >
                          <span
                            className={
                              isDropdownActive
                                ? 'text-[#a3e635]'
                                : 'text-zinc-600 group-hover:text-[#a3e635]'
                            }
                          >
                            {icon}
                          </span>
                          <span>{label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="my-1.5 border-t border-zinc-900" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-rose-400 hover:bg-rose-500/5 transition-colors text-left cursor-pointer"
                  >
                    <FaSignOutAlt
                      size={13}
                      className="text-zinc-600 group-hover:text-rose-400"
                    />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              /* If User Is Logged Out -> Present Premium Login CTA Capsule button */
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-[#a3e635] text-black font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#b5f048] active:scale-95 shadow-[0_4px_20px_rgba(163,230,53,0.15)]"
              >
                Login
              </Link>
            )}

            {/* Mobile Responsive Hamburger Menu Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 space-y-1.5 focus:outline-none bg-zinc-900/40 border border-zinc-900 rounded-xl text-zinc-400 cursor-pointer"
            >
              <span
                className={`block h-0.5 w-4 bg-current transition-transform duration-200 ${drawerOpen ? 'rotate-45 translate-y-2 text-white' : ''}`}
              />
              <span
                className={`block h-0.5 w-4 bg-current transition-opacity duration-200 ${drawerOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-4 bg-current transition-transform duration-200 ${drawerOpen ? '-rotate-45 -translate-y-2 text-white' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════ MOBILE RESPONSIVE DRAWER OVERLAY PANEL ══════════════ */}
      {drawerOpen && (
        <div className="fixed inset-x-4 top-24 z-50 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-full bg-[#050505] border border-zinc-900 rounded-2xl p-4 shadow-[0_30px_60px_rgba(0,0,0,0.9)] max-h-[75vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {currentNavLinks.map(({ label, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-zinc-900/80 text-[#a3e635]'
                        : 'text-zinc-400 hover:bg-zinc-900/40'
                    }`}
                  >
                    <span
                      className={isActive ? 'text-[#a3e635]' : 'text-zinc-600'}
                    >
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Action Area */}
            <div className="mt-4 pt-3 border-t border-zinc-900">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <FaSignOutAlt size={13} />
                  <span className="text-xs uppercase tracking-wider">
                    Logout Squad
                  </span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full bg-[#a3e635] text-black font-black py-3 px-4 rounded-xl flex items-center justify-center text-xs uppercase tracking-widest transition-all text-center shadow-lg"
                >
                  Sign In Access
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
