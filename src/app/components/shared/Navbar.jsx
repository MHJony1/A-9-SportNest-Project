'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaCalendarCheck,
  FaHome,
  FaPlusSquare,
} from 'react-icons/fa';
import { MdSportsSoccer, MdOutlineManageAccounts } from 'react-icons/md';

// ─── NAV LINKS WITH MATCHING ICONS ───────────────────────────
const NAV_LINKS = [
  { label: 'Home', href: '/', icon: <FaHome size={16} /> },
  {
    label: 'All Facilities',
    href: '/all-facilities',
    icon: <MdSportsSoccer size={18} />,
  },
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

const USER_MENU = [
  {
    label: 'My Bookings',
    href: '/my-bookings',
    icon: <FaCalendarCheck size={14} />,
  },
  {
    label: 'Add Facility',
    href: '/add-facilities',
    icon: <FaPlusSquare size={14} />,
  },
  {
    label: 'Manage Facilities',
    href: '/manage-facilities',
    icon: <MdOutlineManageAccounts size={17} />,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();

  // Handle scroll detection to switch classes smoothly
  useEffect(() => {
    const onScroll = () => {
      // Trigger effect immediately after passing 10px of scroll height
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Mock authenticated user data matching reference image
  const user = { name: 'John Doe', email: 'john@playnest.com' };

  return (
    <>
      {/* ══════════════ NAVBAR CONTAINER ══════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'p-2 sm:p-3' : 'p-4 sm:p-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto h-20 px-5 sm:px-8 flex items-center justify-between gap-4 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-zinc-950/85 backdrop-blur-xl border border-zinc-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* ─── LOGO (Completely Unchanged from Original Code) ─── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center shadow-[0_0_16px_rgba(163,230,53,0.35)] group-hover:shadow-[0_0_24px_rgba(163,230,53,0.55)] transition-shadow duration-300">
              <MdSportsSoccer className="text-black text-xl" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase leading-none">
              Play<span className="text-lime-400">Nest</span>
            </span>
          </Link>

          {/* ─── DESKTOP NAVIGATION LINKS ─── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg group ${
                    isActive
                      ? 'text-lime-400'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`${isActive ? 'text-lime-400' : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`}
                  >
                    {icon}
                  </span>
                  <span>{label}</span>

                  {/* Underline highlight active indicator matching reference image */}
                  {isActive && (
                    <span className="absolute bottom-[-14px] left-3 right-3 h-[2px] bg-lime-400 rounded-full shadow-[0_0_8px_#a3e635]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ─── RIGHT ALIGNED PROFILE / CONTROLS ─── */}
          <div className="flex items-center gap-3" ref={profileRef}>
            {user && (
              <div className="relative">
                {/* Profile Pill Trigger Button */}
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2.5 py-1.5 focus:outline-none group select-none"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-black font-black text-xs">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <span className="hidden sm:block text-zinc-300 text-sm font-semibold group-hover:text-white transition-colors">
                    {user.name}
                  </span>
                  <FaChevronDown
                    size={10}
                    className={`text-zinc-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* ─── DESKTOP DROPDOWN MENU ─── */}
                <div
                  className={`absolute right-0 top-[calc(100%+14px)] w-58 bg-[#0d0d11] border border-zinc-800 rounded-xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-200 origin-top-right z-50 ${
                    profileOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    {USER_MENU.map(({ label, href, icon }) => {
                      const isDropdownActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                            isDropdownActive
                              ? 'text-lime-400 bg-zinc-900/50'
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                          }`}
                        >
                          <span
                            className={`${isDropdownActive ? 'text-lime-400' : 'text-zinc-600 group-hover:text-lime-400'} transition-colors`}
                          >
                            {icon}
                          </span>
                          <span>{label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="my-1.5 border-t border-zinc-800/60" />

                  <button
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-500/5 transition-colors text-left"
                  >
                    <FaSignOutAlt size={13} className="text-zinc-600" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Responsive Hamburger Menu Toggle Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 space-y-1.5 focus:outline-none bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-zinc-300"
            >
              <span
                className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${drawerOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${drawerOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${drawerOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════ MOBILE RESPONSIVE DRAWER MENU ══════════════ */}
      {drawerOpen && (
        <div className="fixed inset-x-4 top-24 z-50 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-full bg-[#09090b] border border-zinc-800 rounded-2xl p-4 shadow-2xl">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-zinc-900 text-lime-400'
                        : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                    }`}
                  >
                    <span
                      className={isActive ? 'text-lime-400' : 'text-zinc-500'}
                    >
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Full-width bright lime logout action button built specifically for mobile screens */}
            <div className="mt-4 pt-3 border-t border-zinc-800/60">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-[0_4px_20px_rgba(163,230,53,0.2)]"
              >
                <FaSignOutAlt size={14} />
                <span className="text-sm uppercase tracking-wider">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}













