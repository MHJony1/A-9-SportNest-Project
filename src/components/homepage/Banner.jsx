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
} from 'react-icons/md';
import { GiShuttlecock, GiPingPongBat } from 'react-icons/gi';
import { IoFlash } from 'react-icons/io5';

// ─── SPORTS DATA
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

// ─── STATS
const STATS = [
  { icon: <FaMapMarkerAlt size={16} />, value: '500+', label: 'Facilities' },
  { icon: <FaCalendarCheck size={15} />, value: '10+', label: 'Sports' },
  { icon: <FaHeadset size={15} />, value: '24/7', label: 'Booking' },
  { icon: <FaShieldAlt size={15} />, value: '100%', label: 'Trusted' },
];

// ─── ANIMATION VARIANTS
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

// ─── SPORT CARD COMPONENT
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
      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/72 border border-[#B6FF00]/32 backdrop-blur-md">
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

const Banner = () => {
  return (
    <section
      className="relative w-full overflow-hidden min-h-screen
                        pt-22 sm:pt-30 lg:pt-20
                        flex flex-col lg:justify-center"
    >
      {/* ─── INNER WRAPPER ─── */}
      <div
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-8
                      pt-8 pb-6
                      sm:pt-10 sm:pb-8
                      lg:py-10"
      >
        <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/*  LEFT: COPY SECTION*/}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 mb-4 sm:mb-5 px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(182,255,0,0.07)',
                border: '1px solid rgba(182,255,0,0.24)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B6FF00] animate-pulse" />
              <span className="font-black uppercase text-[11px] tracking-widest text-[#B6FF00]">
                BOOK • PLAY • COMPETE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-black uppercase leading-[0.88] tracking-tight text-white mb-4 sm:mb-5"
              style={{ fontSize: 'clamp(38px, 6vw, 70px)' }}
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
              className="text-zinc-400 leading-relaxed mb-6 max-w-sm text-[clamp(13px,1.35vw,16px)] mx-auto lg:mx-0"
            >
              Book football turfs, cricket grounds, badminton courts, running
              pools, volleyball arenas and more — all from one place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 sm:mb-8 w-full lg:w-auto"
            >
              <Link
                href="/all-facilities"
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full font-black text-sm uppercase text-black transition-all duration-200 active:scale-95 tracking-wide"
                style={{
                  background: '#B6FF00',
                  boxShadow:
                    '0 0 30px rgba(182,255,0,0.42), 0 0 60px rgba(182,255,0,0.14)',
                }}
              >
                <FaCalendarCheck size={12} />
                Explore Facilities
                <FaArrowRight size={11} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm uppercase text-white transition-all duration-200 active:scale-95 tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Get Started
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-8 w-full"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center lg:items-start gap-1"
                >
                  <span
                    style={{ color: '#B6FF00' }}
                    className="flex items-center"
                  >
                    {s.icon}
                  </span>
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

          {/*  RIGHT: IMAGE GRID*/}
          {/* ── Desktop (lg+): original 2-column mosaic ── */}
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
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: '2fr 1fr',
                gridTemplateRows: '1fr 1fr',
                height: '340px',
              }}
            >
              <SportCard sport={SPORTS[0]} className="row-span-2" />
              <SportCard sport={SPORTS[1]} />
              <SportCard sport={SPORTS[2]} />
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)', height: '145px' }}
            >
              <SportCard sport={SPORTS[3]} />
              <SportCard sport={SPORTS[4]} />
              <SportCard sport={SPORTS[5]} />
            </div>
          </motion.div>

          {/* ── Tablet (sm–lg): same mosaic layout, smaller heights ── */}
          <motion.div
            className="w-full hidden sm:flex lg:hidden flex-col gap-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12,
            }}
          >
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: '2fr 1fr',
                gridTemplateRows: '1fr 1fr',
                height: '240px',
              }}
            >
              <SportCard sport={SPORTS[0]} className="row-span-2" />
              <SportCard sport={SPORTS[1]} />
              <SportCard sport={SPORTS[2]} />
            </div>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)', height: '110px' }}
            >
              <SportCard sport={SPORTS[3]} />
              <SportCard sport={SPORTS[4]} />
              <SportCard sport={SPORTS[5]} />
            </div>
          </motion.div>

          {/* ── Mobile (<sm): horizontal scroll strip ── */}
          <motion.div
            className="flex sm:hidden gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {SPORTS.map((sport) => (
              <div
                key={sport.name}
                className="relative shrink-0 rounded-xl overflow-hidden"
                style={{
                  width: '140px',
                  height: '100px',
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
                  <span
                    style={{ color: '#B6FF00' }}
                    className="flex items-center"
                  >
                    {sport.icon}
                  </span>
                  <span className="text-white font-black uppercase text-[8px]">
                    {sport.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
