'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { MdSportsSoccer } from 'react-icons/md';

// ─── QUICK LINKS DATA ────────────────────────────────────────
const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All Facilities', href: '/all-facilities' },
  { label: 'My Bookings', href: '/my-bookings' },
  { label: 'Add Facility', href: '/add-facilities' },
  { label: 'Manage Facilities', href: '/manage-facilities' },
];

// ─── SPORTS CATEGORIES DATA ──────────────────────────────────
const SPORTS_CATEGORIES = [
  { label: 'Football', href: '/sports/football' },
  { label: 'Cricket', href: '/sports/cricket' },
  { label: 'Tennis', href: '/sports/tennis' },
  { label: 'Basketball', href: '/sports/basketball' },
  { label: 'Volleyball', href: '/sports/volleyball' },
];

// ─── SOCIAL MEDIA LINKS DATA ─────────────────────────────────
const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF size={14} />,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: <FaTwitter size={14} />,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
  {
    icon: <FaInstagram size={14} />,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: <FaLinkedinIn size={14} />,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 overflow-hidden pt-12 sm:pt-20 pb-8 w-full text-zinc-400">
      {/* ── Background Ambiance (Fixed Hydration Issue) ── */}
      <div className="absolute -bottom-24 -left-20 w-112.5 h-112.5 rounded-full bg-lime-400/5 blur-[100px] pointer-events-none" />

      {/* ── Main Content Grid (Perfected Responsiveness) ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 pb-12 sm:pb-16 border-b border-zinc-900">
        {/* ────── COLUMN 1: Brand & Description (Mobile: Full Width, Tablet: Half, Desktop: 4 Cols) ────── */}
        <div className="flex flex-col items-start col-span-1 sm:col-span-2 lg:col-span-4 space-y-5 sm:space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center shadow-[0_0_16px_rgba(163,230,53,0.35)] group-hover:shadow-[0_0_24px_rgba(163,230,53,0.55)] transition-shadow duration-300">
              <MdSportsSoccer className="text-black text-xl" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase leading-none">
              Play<span className="text-lime-400">Nest</span>
            </span>
          </Link>

          {/* Short Platform Description */}
          <p className="text-sm leading-relaxed max-w-sm text-zinc-400/90">
            Discover top-rated pitches, courts, and premium venues near you.
            Book your preferred sports facilities seamlessly and play anytime
            you want.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 pt-1">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-lime-400 hover:border-lime-400 transition-all duration-300 active:scale-95 shadow-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ────── COLUMN 2: Quick Links (Mobile: 1 Col, Tablet: 1 Col, Desktop: 2 Cols) ────── */}
        <div className="flex flex-col items-start col-span-1 sm:col-span-1 lg:col-span-2 space-y-4 sm:space-y-5">
          <h2 className="text-white font-bold text-sm uppercase tracking-wider">
            Quick Links
          </h2>
          <nav className="flex flex-col gap-3">
            {QUICK_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-zinc-400 hover:text-lime-400 transition-colors duration-200 font-medium w-max"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ────── COLUMN 3: Sports Categories (Mobile: 1 Col, Tablet: 1 Col, Desktop: 3 Cols) ────── */}
        <div className="flex flex-col items-start col-span-1 sm:col-span-1 lg:col-span-3 space-y-4 sm:space-y-5">
          <h2 className="text-white font-bold text-sm uppercase tracking-wider">
            Sports Categories
          </h2>
          <nav className="flex flex-col gap-3">
            {SPORTS_CATEGORIES.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-zinc-400 hover:text-lime-400 transition-colors duration-200 font-medium w-max"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ────── COLUMN 4: Contact Information (Mobile: 1 Col, Tablet: 1 Col, Desktop: 3 Cols) ────── */}
        <div className="flex flex-col items-start col-span-1 sm:col-span-1 lg:col-span-3 space-y-4 sm:space-y-5">
          <h2 className="text-white font-bold text-sm uppercase tracking-wider">
            Contact Info
          </h2>
          <div className="flex flex-col gap-4 text-sm font-medium">
            {/* Phone */}
            <div className="flex items-start gap-3 group">
              <FaPhoneAlt size={13} className="text-lime-400 mt-1 shrink-0" />
              <a
                href="tel:+880123456789"
                className="hover:text-white transition-colors duration-200"
              >
                +880 1234-567890
              </a>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 group">
              <FaEnvelope size={13} className="text-lime-400 mt-1 shrink-0" />
              <a
                href="mailto:support@playnest.com"
                className="hover:text-white transition-colors duration-200"
              >
                support@playnest.com
              </a>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt
                size={14}
                className="text-lime-400 mt-0.5 shrink-0"
              />
              <span className="leading-relaxed text-zinc-400/90">
                Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright Section (Fully Responsive Alignment) ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500 tracking-wide text-center sm:text-left">
        <p>© {currentYear} PLAYNEST. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="hover:text-zinc-400 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-zinc-400 transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
