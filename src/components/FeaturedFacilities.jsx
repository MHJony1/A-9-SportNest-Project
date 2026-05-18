'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaInbox } from 'react-icons/fa';
import FacilityCard from '@/components/FacilityCard';
import { featuredFacilities } from '@/lib/facilities/data';


import 'swiper/css';
import 'swiper/css/pagination';

// ─── FRAMER MOTION ANIMATION VARIANTS
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeaturedFacilities = () => {
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Client-side data fetching to support swiper and motion dynamics flawlessly
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await featuredFacilities();
        setFeaturedData(data || []);
      } catch (error) {
        console.error('Error fetching featured facilities:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-800 border-t-[#a3e635] animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-12 relative z-10 overflow-hidden">
      {/* ── Custom Pagination Styles to Inject Your Brand Neon Theme ── */}
      <style>{`
        .premium-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 40px !important;
          bottom: 0 !important;
        }
        .premium-swiper .swiper-pagination-bullet {
          background: #3f3f46 !important;
          opacity: 1 !important;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
          border-radius: 9999px;
        }
        .premium-swiper .swiper-pagination-bullet-active {
          background: #a3e635 !important;
          width: 24px; /* Premium pill stretch effect */
          box-shadow: 0 0 12px rgba(163, 230, 53, 0.6);
        }
      `}</style>

      {/* ══════════════ PREMIUM SECTION HEADER WITH MOTION ══════════════ */}
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
              Top Rated Choices
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase leading-none text-white">
            Featured <span className="text-[#a3e635]">Facilities</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-xs leading-relaxed md:text-right font-medium">
          Handpicked premium arenas with high-end amenities and top-tier
          ratings.
        </p>
      </motion.div>

      {/* ══════════════ SWIPER SLIDER WITH MOTION ══════════════ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="w-full"
      >
        {featuredData.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="premium-swiper overflow-visible"
          >
            {featuredData.map((facility) => (
              <SwiperSlide
                key={facility._id || facility.id}
                className="h-full py-2"
              >
                <FacilityCard facility={facility} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Fallback State Layout if database returns empty */
          <div className="w-full rounded-3xl border border-zinc-900 bg-zinc-900/10 py-20 px-4 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-5 shadow-xl">
              <FaInbox size={22} className="text-zinc-500" />
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-wider mb-2">
              No Featured Venues
            </h3>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">
              We couldn&apos;t retrieve any featured records from the booking
              servers right now.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FeaturedFacilities;
