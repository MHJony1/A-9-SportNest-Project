'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaFutbol } from 'react-icons/fa';

// ─── ANIMATION VARIANT  ──────
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const PremiumCTA = () => {
  return (
    <section className="w-full py-24 px-5 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* ══════════════ BOX CONTAINER WITH PREMIUM GLOW ══════════════ */}
      <motion.div
        className="relative rounded-[32px] bg-linear-to-br from-zinc-900/40 to-zinc-950/60 border border-zinc-900/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col items-center text-center space-y-8 group"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        {/* Subtle Ambient Glow inside the CTA Box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 rounded-full bg-[#a3e635]/2.5 blur-[100px] pointer-events-none" />
        
        {/* Decorative Absolute Background Icon */}
        <div className="absolute right-[-5%] bottom-[-10%] text-zinc-900/15 pointer-events-none rotate-12 transition-transform duration-700 group-hover:rotate-45">
          <FaFutbol size={280} />
        </div>

        {/* ── Badge ── */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a3e635]/5 border border-[#a3e635]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-ping" />
          <span className="text-[#a3e635] text-[10px] font-black tracking-widest uppercase">
            Limited Available Slots
          </span>
        </div>

        {/* ── Typographic Headline ── */}
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.05] text-white">
            Don&apos;t Just Watch.<br />
            <span className="text-[#a3e635]">Get In The Game.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-medium max-w-lg mx-auto leading-relaxed">
            Join over 10,000+ athletes booking their preferred venues daily. Secure your arena, summon your squad, and dominate the pitch.
          </p>
        </div>

        {/* ── Action Button (CTA Button) ── */}
        <div className="pt-2">
          <Link
            href="/all-facilities"
            className="inline-flex items-center gap-3 px-8 h-14 rounded-2xl bg-[#a3e635] text-black font-black text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#b5f048] active:scale-95 shadow-[0_10px_30px_rgba(163,230,53,0.25)] hover:shadow-[0_10px_40px_rgba(163,230,53,0.45)]"
          >
            <span>Find An Arena Near You</span>
            <FaArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </motion.div>
    </section>
  );
};

export default PremiumCTA;