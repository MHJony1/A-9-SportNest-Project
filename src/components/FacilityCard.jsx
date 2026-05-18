// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { FaCalendarAlt, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

// const FacilityCard = ({ facility}) => {
//   return (
//     <div>
//        <div
//                 key={facility._id || facility.id}
//                 className="group relative rounded-2xl bg-zinc-900/40 border border-zinc-900 hover:border-lime-400/30 transition-all duration-300 overflow-hidden flex flex-col shadow-2xl backdrop-blur-sm"
//               >
//                 {/* Thumbnail Image Container */}
//                 <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
//                   {facility.image ? (
//                     <Image
//                       src={facility.image}
//                       alt={facility.name || 'Facility'}
//                       fill
//                       sizes="(max-w-768px) 100vw, 400px"
//                       className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
//                       No Image Available
//                     </div>
//                   )}
//                   {/* Subtle Gradient Shadow Mask on Image */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

//                   {/* Category Badge overlay */}
//                   {facility.location && (
//                     <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-zinc-800 text-zinc-300 text-[11px] font-semibold tracking-wide flex items-center gap-1.5 backdrop-blur-md">
//                       <FaMapMarkerAlt size={10} className="text-lime-400" />
//                       <span className="truncate max-w-[120px]">
//                         {facility.location.split(',')[0]}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content Metadata Area */}
//                 <div className="p-5 flex-1 flex flex-col justify-between">
//                   <div className="space-y-2.5">
//                     <h2 className="text-white font-black text-xl uppercase tracking-wide group-hover:text-lime-400 transition-colors duration-200 line-clamp-1">
//                       {facility.name || 'Unnamed Facility'}
//                     </h2>
//                     <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
//                       {facility.description ||
//                         'No description provided for this premium facility venue.'}
//                     </p>
//                   </div>

//                   {/* Pricing / Booking Footer Segment */}
//                   <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between gap-2">
//                     <div className="flex flex-col">
//                       <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
//                         Price per hour
//                       </span>
//                       <div className="flex items-center text-lime-400 font-black text-lg mt-0.5">
//                         <FaDollarSign size={13} className="shrink-0" />
//                         <span>{facility.price_per_hour || '0.00'}</span>
//                       </div>
//                     </div>

//                     <Link
//                       href={`/all-facilities/${facility._id || facility.id}`}
//                       className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-200 active:scale-95"
//                     >
//                       <FaCalendarAlt size={10} />
//                       <span>Details</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//     </div>
//   );
// };

// export default FacilityCard;





'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaUsers, FaBolt, FaClock } from 'react-icons/fa';

// ─── PREMIUM NEON SPORT THEME MAP ───────────────────────────
// Carefully curated vibrant neon accents that pop beautifully on dark zinc-950
const SPORT_THEMES = {
  football: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/30',
    text: 'text-emerald-400',
  },
  cricket: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/30',
    text: 'text-amber-400',
  },
  badminton: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-400/30',
    text: 'text-cyan-400',
  },
  volleyball: {
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-400/30',
    text: 'text-fuchsia-400',
  },
  basketball: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-400/30',
    text: 'text-orange-400',
  },
  'table tennis': {
    bg: 'bg-rose-500/10',
    border: 'border-rose-400/30',
    text: 'text-rose-400',
  },
  // Default/Unmatched Fallback: Reverted to your exact signature Neon Lime Green
  default: {
    bg: 'bg-[#a3e635]/8',
    border: 'border-[#a3e635]/25',
    text: 'text-[#a3e635]',
  },
};

const FacilityCard = ({ facility }) => {
  // Enhanced fallback logic to ensure images render dynamically without breaking
  const targetImage = facility.image || facility.imageSrc || facility.imageUrl || facility.img;
  
  // Safe extraction of key parameters mapping with your database fields
  const hourlyPrice = facility.pricePerHour || facility.price_per_hour || '0';
  const capacity = facility.capacity || facility.playerCapacity || 'N/A';
  
  // Normalize facility type for accurate key matching
  const rawFacilityType = facility.facility_type || facility.category || 'Sports';
  const facilityTypeNormalized = rawFacilityType.toLowerCase().trim();

  // Pick the active sport theme configuration matrix (or fallback to your classic neon lime)
  const currentTheme = SPORT_THEMES[facilityTypeNormalized] || SPORT_THEMES.default;

  return (
    <div className="w-full">
      <div className="group relative rounded-3xl bg-zinc-900/40 border border-zinc-800/60 hover:border-[#a3e635]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(163,230,53,0.05)] transition-all duration-300 overflow-hidden flex flex-col h-full backdrop-blur-sm">
        
        {/* ─── TOP SECTION: VISUAL MEDIA CONTAINER ─── */}
        <div className="relative w-full aspect-[16/11] overflow-hidden bg-zinc-950">
          {targetImage ? (
            <Image
              src={targetImage}
              alt={facility.name || 'Sports Venue'}
              fill
              sizes="(max-w-768px) 100vw, 400px"
              className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-800 bg-zinc-900/20 gap-2">
              <span className="text-3xl">🏟️</span>
              <span className="text-[10px] font-black tracking-widest uppercase text-zinc-600">No View Available</span>
            </div>
          )}

          {/* Deep atmospheric dark vignette mask over media layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          {/* Top-Left: Re-designed Dynamic Facility Type Badge with Custom Premium Color Matrix */}
          <div className={`absolute top-3 left-3 px-3.5 py-1.5 rounded-xl backdrop-blur-md shadow-md border ${currentTheme.bg} ${currentTheme.border}`}>
            <span className={`font-black uppercase text-[10px] tracking-widest ${currentTheme.text}`}>
              {rawFacilityType}
            </span>
          </div>

          {/* Top-Right: Premium Re-designed Price Pill */}
          <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-xl bg-black/60 border border-zinc-800/50 backdrop-blur-md shadow-md flex items-center gap-1">
            <span className="text-white font-black text-sm">${hourlyPrice}</span>
            <span className="text-zinc-400 font-medium text-[10px] lowercase">/ hr</span>
          </div>
        </div>

        {/* ─── BOTTOM SECTION: METADATA & CONTROL PACK ─── */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-3.5">
            {/* Facility Title */}
            <h2 className="text-white font-black text-xl uppercase tracking-wide group-hover:text-[#a3e635] transition-colors duration-200 line-clamp-1">
              {facility.name || 'Premium Sports Complex'}
            </h2>
            
            {/* Premium Iconographic Specifications Stack */}
            <div className="flex flex-col gap-3 pt-1 text-zinc-400 text-sm font-semibold tracking-wide">
              {/* Geolocation Property */}
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt size={13} className="text-zinc-600 shrink-0" />
                <span className="truncate text-zinc-300">
                  {facility.location || 'Dhaka, Bangladesh'}
                </span>
              </div>

              {/* Player Capacity Parameter */}
              <div className="flex items-center gap-3">
                <FaUsers size={13} className="text-zinc-600 shrink-0" />
                <span className="text-zinc-300">Up to {capacity} Players Capacity</span>
              </div>

              {/* Premium Feature: Instant Confirmation Badge */}
              <div className="flex items-center gap-3">
                <FaBolt size={12} className="text-[#a3e635] shrink-0 animate-pulse" />
                <span className="text-zinc-300">Instant Confirmation Available</span>
              </div>
            </div>
          </div>

          {/* Action Layer: Full-Width Bright Lime Booking Call-to-Action */}
          <div className="pt-1">
            <Link
              href={`/all-facilities/${facility._id || facility.id}`}
              className="w-full h-12 rounded-xl bg-[#a3e635] text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#b5f048] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_25px_rgba(163,230,53,0.18)] hover:shadow-[0_4px_30px_rgba(163,230,53,0.35)]"
            >
              <FaClock size={13} className="stroke-[1.5]" />
              <span>Book Now</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacilityCard;