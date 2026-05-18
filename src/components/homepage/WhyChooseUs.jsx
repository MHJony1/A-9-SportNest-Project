'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaShieldAlt, FaLightbulb, FaExchangeAlt } from 'react-icons/fa';

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
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── PREMIUM FEATURES DATA
const FEATURES = [
  {
    icon: <FaBolt size={18} />,
    title: 'Instant Confirmation',
    desc: 'No manual counter approvals or long waiting hours. Lock your preferred turf or pitch instantly with automated slot synchronization.',
  },
  {
    icon: <FaShieldAlt size={18} />,
    title: '100% Verified Venues',
    desc: 'Every single arena listed on PlayNest is physically vetted by our team to guarantee premium turf quality, lighting, and amenities.',
  },
  {
    icon: <FaLightbulb size={18} />,
    title: 'Day & Night Matches',
    desc: 'Easily filter fields that offer high-end professional floodlight setups so that your late-night matches never lose energy.',
  },
  {
    icon: <FaExchangeAlt size={18} />,
    title: 'Flexible Rescheduling',
    desc: 'Sudden rain or team emergency? Enjoy an industry-first flexible cancellation or dynamic slot transfer ecosystem seamlessly.',
  },
];

const WhyChooseUs = () => {
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
              Our Core Edge
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase leading-none text-white">
            Why Book With <span className="text-[#a3e635]">PlayNest</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-xs leading-relaxed md:text-right font-medium">
          Engineered by athletes, optimized for squads. Experience the next generation of sports facility booking.
        </p>
      </motion.div>

      {/* ══════════════ TWO-COLUMN CONTENT GRID ══════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* ─── LEFT SIDE: LIVE METRIC VISUAL BOX (Occupies 5 Columns) ─── */}
        <motion.div
          className="lg:col-span-5 relative rounded-[32px] bg-linear-to-br from-zinc-900/30 to-zinc-950/50 border border-zinc-900 p-8 flex flex-col justify-between overflow-hidden shadow-2xl min-h-95 lg:min-h-115 group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          {/* Subtle Corner Glow Ambient Light */}
          <div className="absolute top-0 right-0 w-50 h-50 rounded-full bg-[#a3e635]/2.5 blur-[60px] pointer-events-none" />

          {/* Top Decorative Layout */}
          <div className="space-y-4">
            <div className="h-6 w-20 rounded-md bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center">
              <span className="text-[9px] font-black tracking-widest uppercase text-[#a3e635]">LIVE FEED</span>
            </div>
            <h3 className="text-white font-black text-2xl uppercase tracking-wide leading-tight">
              Empowering the local<br />
              <span className="text-[#a3e635]">sports ecosystem</span>
            </h3>
            <p className="text-zinc-500 text-xs font-semibold leading-relaxed max-w-xs">
              We bridge the gap between premium facility owners and local athletes through a fluid, high-performance portal layout.
            </p>
          </div>

          {/* Bottom Luxury Statistics Overlay */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-900/80">
            <div>
              <span className="text-white font-black text-4xl tracking-tight block">99.8%</span>
              <span className="text-zinc-500 text-[10px] uppercase font-black tracking-wider mt-1 block">Booking Success</span>
            </div>
            <div>
              <span className="text-[#a3e635] font-black text-4xl tracking-tight block">&lt;2m</span>
              <span className="text-zinc-500 text-[10px] uppercase font-black tracking-wider mt-1 block">Average Checkout</span>
            </div>
          </div>
        </motion.div>

        {/* ─── RIGHT SIDE: UTILITY LOGIC FEATURES LIST (Occupies 7 Columns) ─── */}
        <motion.div
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeInUp}
              className="group relative rounded-2xl bg-zinc-900/10 border border-zinc-900/80 hover:border-zinc-800 p-6 flex flex-col space-y-4 transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              {/* Dynamic Icon Structure */}
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 text-[#a3e635] group-hover:border-[#a3e635]/40 flex items-center justify-center transition-all duration-300 shrink-0 shadow-md">
                {f.icon}
              </div>

              {/* Text Information Stack */}
              <div className="space-y-1.5">
                <h3 className="text-white font-black text-base uppercase tracking-wider group-hover:text-[#a3e635] transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;