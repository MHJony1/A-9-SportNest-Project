'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHeadset,
} from 'react-icons/fa';
import {
  MdSportsSoccer,
  MdSportsVolleyball,
  MdSportsBasketball,
  MdPool,
} from 'react-icons/md';
import { GiShuttlecock, GiPingPongBat } from 'react-icons/gi';
import { IoFlash } from 'react-icons/io5';

// ─── SPORTS DATA ─────────────────────────────────────────────
const SPORTS = [
  {
    name: 'Football',
    icon: <MdSportsSoccer size={13} />,
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Cricket',
    icon: <IoFlash size={12} />,
    image:
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Volleyball',
    icon: <MdSportsVolleyball size={13} />,
    image:
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Badminton',
    icon: <GiShuttlecock size={13} />,
    image:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Basketball',
    icon: <MdSportsBasketball size={13} />,
    image:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Table Tennis',
    icon: <GiPingPongBat size={13} />,
    image:
      'https://plus.unsplash.com/premium_photo-1672176758793-86714e201c27?w=600&auto=format&fit=crop',
  },
];

// ─── STATS ───────────────────────────────────────────────────
const STATS = [
  { icon: <FaMapMarkerAlt size={16} />, value: '500+', label: 'Facilities' },
  { icon: <FaCalendarCheck size={15} />, value: '10+', label: 'Sports' },
  { icon: <FaHeadset size={15} />, value: '24/7', label: 'Booking' },
  { icon: <FaShieldAlt size={15} />, value: '100%', label: 'Trusted' },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── SPORT CARD ──────────────────────────────────────────────
function SportCard({ sport, className = '' }) {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden cursor-pointer ${className}`}
      style={{ border: '1px solid rgba(182,255,0,0.18)' }}
      whileHover={{ scale: 1.035 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
    >
      <Image
        src={sport.image}
        alt={sport.name}
        fill
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(182,255,0,0.15) 0%, transparent 60%)',
          boxShadow: 'inset 0 0 0 1px rgba(182,255,0,0.35)',
        }}
      />
      {/* Badge */}
      <div
        className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-lg"
        style={{
          background: 'rgba(0,0,0,0.72)',
          border: '1px solid rgba(182,255,0,0.32)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ color: '#B6FF00' }}>{sport.icon}</span>
        <span
          className="font-black text-white uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.1em' }}
        >
          {sport.name}
        </span>
      </div>
    </motion.div>
  );
}

 const Banner = () =>{
  // Navbar total heights
  const NAV_H_MOBILE = 112; // px
  const NAV_H_SM = 120; // px  (sm: and above)

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#050505' }}
    >
      {/* ── Responsive style for layout calc ── */}
      <style>{`
        .hero-padtop   { padding-top: ${NAV_H_MOBILE}px; }
        @media (min-width: 640px) {
          .hero-padtop { padding-top: ${NAV_H_SM}px; }
        }
        .grid-top {
          height: calc((100vh - ${NAV_H_MOBILE}px - 88px) * 0.64);
          min-height: 220px;
          max-height: 380px;
        }
        .grid-bottom {
          height: calc((100vh - ${NAV_H_MOBILE}px - 88px) * 0.30);
          min-height: 90px;
          max-height: 155px;
        }
        @media (min-width: 640px) {
          .grid-top {
            height: calc((100vh - ${NAV_H_SM}px - 80px) * 0.65);
            max-height: 400px;
          }
          .grid-bottom {
            height: calc((100vh - ${NAV_H_SM}px - 80px) * 0.29);
            max-height: 165px;
          }
        }
      `}</style>

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #B6FF00 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Neon blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: '-5%',
          width: '52vw',
          height: '52vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(182,255,0,0.09) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '-5%',
          width: '38vw',
          height: '38vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(182,255,0,0.055) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="hero-padtop relative h-full flex flex-col"
        style={{ boxSizing: 'border-box' }}
      >
        <div
          className="flex-1 flex items-center overflow-hidden"
          style={{ paddingBottom: '16px' }}
        >
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* ══════ LEFT: COPY ══════ */}
              <motion.div
                className="flex flex-col items-start"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {/* Badge */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(182,255,0,0.07)',
                    border: '1px solid rgba(182,255,0,0.24)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#B6FF00' }}
                  />
                  <span
                    className="font-black uppercase text-[11px]"
                    style={{ color: '#B6FF00', letterSpacing: '0.2em' }}
                  >
                    BOOK • PLAY • COMPETE
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={fadeUp}
                  className="font-black uppercase leading-[0.88] tracking-tight text-white mb-5"
                  style={{ fontSize: 'clamp(34px, 4.6vw, 70px)' }}
                >
                  ONE PLATFORM.
                  <br />
                  <span style={{ color: '#B6FF00' }}>COUNTLESS</span>
                  <br />
                  GAMES.
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={fadeUp}
                  className="text-zinc-400 leading-relaxed mb-7 max-w-sm"
                  style={{ fontSize: 'clamp(13px, 1.35vw, 16px)' }}
                >
                  Book football turfs, cricket grounds, badminton courts,
                  swimming pools, volleyball arenas and more — all from one
                  place.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  <Link
                    href="/all-facilities"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm uppercase text-black transition-all duration-200 active:scale-95"
                    style={{
                      background: '#B6FF00',
                      boxShadow:
                        '0 0 30px rgba(182,255,0,0.42), 0 0 60px rgba(182,255,0,0.14)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <FaCalendarCheck size={12} />
                    Explore Facilities
                    <FaArrowRight size={11} />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase text-white transition-all duration-200 active:scale-95"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      letterSpacing: '0.08em',
                    }}
                  >
                   Get Started
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-6 sm:gap-8"
                >
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1">
                      <span style={{ color: '#B6FF00' }}>{s.icon}</span>
                      <span className="text-white font-black text-sm leading-none">
                        {s.value}
                      </span>
                      <span className="text-zinc-500 text-[11px] leading-none">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ══════ RIGHT: IMAGE GRID (desktop only) ══════ */}
              <motion.div
                className="w-full hidden lg:flex flex-col gap-2"
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
              >
                {/* Top grid: Football big (left 2/3) + Cricket + Volleyball stacked (right 1/3) */}
                <div
                  className="grid gap-2 grid-top"
                  style={{
                    gridTemplateColumns: '2fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                  }}
                >
                  <SportCard sport={SPORTS[0]} className="row-span-2" />
                  <SportCard sport={SPORTS[1]} />
                  <SportCard sport={SPORTS[2]} />
                </div>

                {/* Bottom row: Badminton | Basketball | Table Tennis */}
                <div
                  className="grid gap-2 grid-bottom"
                  style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
                >
                  <SportCard sport={SPORTS[3]} />
                  <SportCard sport={SPORTS[4]} />
                  <SportCard sport={SPORTS[5]} />
                </div>
              </motion.div>

              {/* ══════ MOBILE: Horizontal scroll strip ══════ */}
              <motion.div
                className="flex lg:hidden gap-3 overflow-x-auto pb-2 -mx-5 px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                style={{ scrollbarWidth: 'none' }}
              >
                {SPORTS.map((sport) => (
                  <div
                    key={sport.name}
                    className="relative shrink-0 rounded-xl overflow-hidden"
                    style={{
                      width: '130px',
                      height: '90px',
                      border: '1px solid rgba(182,255,0,0.2)',
                    }}
                  >
                    <Image
                      src={sport.image}
                      alt={sport.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                    <div
                      className="absolute bottom-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                      style={{
                        background: 'rgba(0,0,0,0.7)',
                        border: '1px solid rgba(182,255,0,0.3)',
                      }}
                    >
                      <span style={{ color: '#B6FF00' }}>{sport.icon}</span>
                      <span
                        className="text-white font-black uppercase"
                        style={{ fontSize: '8px' }}
                      >
                        {sport.name}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(5,5,5,0.8))',
        }}
      />
    </section>
  );
}

export default Banner;
