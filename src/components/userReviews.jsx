'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

// ─── ANIMATION VARIANTS FOR THE HEADER ───────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── 9 PREMIUM REVIEWS DATA FROM DIFFERENT SPORTS ───────────
const REVIEWS = [
  {
    name: 'Asif Rahman',
    role: 'Captain, FC Dhaka Squad',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    review: 'PlayNest has completely changed how we book turfs. The instant slot booking and confirmation take less than two minutes!',
    sport: 'Football'
  },
  {
    name: 'Tamim Iqbal',
    role: 'Cricket Tournament Organizer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    review: 'Finding grounds with professional floodlight setups used to be a hassle. With PlayNest, we got exactly what we paid for.',
    sport: 'Cricket'
  },
  {
    name: 'Nadia Islam',
    role: 'Badminton Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    review: 'The user interface is slick, dark, and extremely intuitive. Last week we had to reschedule, and the process was seamless.',
    sport: 'Badminton'
  },
  {
    name: 'Siam Ahmed',
    role: 'Corporate Team Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    review: 'Outstanding platform! Booking our weekend corporate matches is now completely hassle-free. Best sporting vibe ever.',
    sport: 'Volleyball'
  },
  {
    name: 'Zayan Malik',
    role: 'Striker, Dhanmondi Strikers',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    review: 'Premium courts, clear pricing, and no hidden charges. This application is a literal lifesaver for our regular practice matches.',
    sport: 'Basketball'
  },
  {
    name: 'Farhana Adil',
    role: 'Table Tennis Club Member',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    review: 'Highly recommended for indoor facility bookings. The live dashboard availability matrix is unbelievably accurate.',
    sport: 'Table Tennis'
  },
  {
    name: 'Rashedul Bari',
    role: 'Squad Manager',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    review: 'No more back-and-forth phone calls with field caretakers. Just selected the timing, made the payment, and we were good to go!',
    sport: 'Football'
  },
  {
    name: 'Anika Tahsin',
    role: 'Weekend Sports Coordinator',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
    review: 'Love the premium dark design aesthetics and glass-morphic layout cards. Truly world-class booking experience.',
    sport: 'Badminton'
  },
  {
    name: 'Tanvir Huda',
    role: 'Local Tournament Host',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    review: 'The automated slots locking algorithm works like a charm. Zero double-booking issues across multiple premier complexes.',
    sport: 'Cricket'
  }
];

const UserReviews = () => {
  return (
    <section className="w-full py-20 relative z-10 overflow-hidden">
      
      {/* ─── CUSTOM MARQUEE ANIMATION MATRIX ─── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-smooth {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-wrapper:hover .animate-marquee-smooth {
          animation-play-state: paused; /* Hover করলে স্ক্রলিং আলতো করে পজ হয়ে যাবে */
        }
      `}</style>

      {/* ══════════════ SECTION HEADER (Max-Width Aligned) ══════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14">
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
                Squad Feedback
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase leading-none text-white">
              Trusted By <span className="text-[#a3e635]">Players</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed md:text-right font-medium">
            See how local athletes, captains, and squads elevate their game-day planning with our ecosystem.
          </p>
        </motion.div>
      </div>

      {/* ══════════════ INFINITE SCROLLING MARQUEE LAYER ══════════════ */}
      <div className="marquee-wrapper relative w-full overflow-hidden mask-gradient-edges py-4">
        
        {/* Subtle Luxury Gradient Fades on Left & Right Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee-smooth gap-6 px-4">
          
          {/* First loop rendering array cards */}
          {REVIEWS.map((r, index) => (
            <div 
              key={`marquee-1-${index}`} 
              className="w-[320px] sm:w-90 shrink-0 relative rounded-3xl bg-zinc-900/20 border border-zinc-900/80 hover:border-zinc-800/80 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 shadow-2xl overflow-hidden group"
            >
              <div className="absolute right-6 top-6 text-zinc-800/15 group-hover:text-[#a3e635]/5 transition-colors duration-300 pointer-events-none">
                <FaQuoteLeft size={28} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={11} className="text-[#a3e635]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-900">
                    {r.sport}
                  </span>
                </div>

                <p className="text-zinc-300 text-[13px] sm:text-sm leading-relaxed font-medium">
                  &ldquo;{r.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 mt-5 border-t border-zinc-900/80">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-800 bg-zinc-950">
                  <Image src={r.avatar} alt={r.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide group-hover:text-[#a3e635] transition-colors duration-200">
                    {r.name}
                  </h4>
                  <p className="text-zinc-500 text-[11px] font-semibold">{r.role}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Second cloned loop rendering to achieve flawless infinite seamless scrolling */}
          {REVIEWS.map((r, index) => (
            <div 
              key={`marquee-2-${index}`} 
              className="w-[320px] sm:w-90 shrink-0 relative rounded-3xl bg-zinc-900/20 border border-zinc-900/80 hover:border-zinc-800/80 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 shadow-2xl overflow-hidden group"
            >
              <div className="absolute right-6 top-6 text-zinc-800/15 group-hover:text-[#a3e635]/5 transition-colors duration-300 pointer-events-none">
                <FaQuoteLeft size={28} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={11} className="text-[#a3e635]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-900">
                    {r.sport}
                  </span>
                </div>

                <p className="text-zinc-300 text-[13px] sm:text-sm leading-relaxed font-medium">
                  &ldquo;{r.review}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 mt-5 border-t border-zinc-900/80">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-800 bg-zinc-950">
                  <Image src={r.avatar} alt={r.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide group-hover:text-[#a3e635] transition-colors duration-200">
                    {r.name}
                  </h4>
                  <p className="text-zinc-500 text-[11px] font-semibold">{r.role}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default UserReviews;