'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaRegCalendarCheck, FaRunning } from 'react-icons/fa';

// ─── ANIMATION VARIANTS  ──────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── HOW IT WORKS STEPS DATA ────────────────────────────────
const STEPS = [
  {
    step: '01',
    icon: <FaSearch size={22} />,
    title: 'Find Your Arena',
    desc: 'Explore premium pitches, courts, and sports complexes near you filtered by sport type and location.',
  },
  {
    step: '02',
    icon: <FaRegCalendarCheck size={22} />,
    title: 'Book Your Slot',
    desc: 'Select your preferred date and convenient time slot securely with our dynamic live calendar system.',
  },
  {
    step: '03',
    icon: <FaRunning size={22} />,
    title: 'Instant Play',
    desc: 'Receive immediate confirmation with secure receipt details and head straight to the field to play.',
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 relative z-10">
      
      {/* ══════════════ SECTION HEADER (Motion Enabled) ══════════════ */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900/60 pb-6 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
            <span className="text-[#a3e635] text-xs font-black tracking-widest uppercase">
              Seamless Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase leading-none text-white">
            How It <span className="text-[#a3e635]">Works</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-xs leading-relaxed md:text-right font-medium">
          Three simple steps to transition from scrolling your screen to scoring on the field.
        </p>
      </motion.div>

      {/* ══════════════ CARD STEPS GRID LAYER ══════════════ */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        {STEPS.map((s) => (
          <motion.div
            key={s.step}
            variants={fadeInUp}
            className="group relative rounded-3xl bg-zinc-900/20 border border-zinc-900 hover:border-[#a3e635]/30 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle Neon Line Effect on Top Hover */}
            <div className="absolute top-0 left-0 w-full h-0.5bg-[#a3e635] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <div className="space-y-6">
              {/* Header Box inside Card: Contains Icon and Step Count */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-center text-[#a3e635] group-hover:bg-[#a3e635] group-hover:text-black transition-all duration-300 shadow-md">
                  {s.icon}
                </div>
                <span className="font-black text-4xl text-zinc-800/60 group-hover:text-[#a3e635]/15 transition-colors duration-300 tracking-tight select-none">
                  {s.step}
                </span>
              </div>

              {/* Text Description Segment */}
              <div className="space-y-2.5">
                <h3 className="text-white font-black text-xl uppercase tracking-wide group-hover:text-[#a3e635] transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;