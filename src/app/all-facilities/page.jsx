import { fetchFacilities } from '@/lib/facilities/data';
import React from 'react';
import {
  FaSearch,
  FaSlidersH,
  FaSortAmountDown,
  FaChevronDown,
  FaInbox,
} from 'react-icons/fa';
import FacilityCard from '@/components/FacilityCard';

// ─── STATIC SPORTS CATEGORIES CHIPS ──────────────────────────
const CATEGORIES = [
  'All Arenas',
  'Football',
  'Cricket',
  'Badminton',
  'Volleyball',
  'Basketball',
  'Table Tennis',
];

const AllFacilitiesPage = async () => {
  const facilities = await fetchFacilities();

  return (
    <main className="min-h-screen pt-32 pb-20 px-5 sm:px-8 relative">
      {/* ── Main Container ── */}
      <div className="relative max-w-7xl mx-auto w-full z-10 space-y-10">
        {/* ══════════════ HEADER SECTION ══════════════ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900/80 pb-8 gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
              <span className="text-[#a3e635] text-xs font-black tracking-widest uppercase">
                Premium Arenas
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none">
              All <span className="text-[#a3e635]">Facilities</span>
            </h1>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed md:text-right font-medium">
            Explore and reserve premium pitches, courts, and sports complexes
            instantly.
          </p>
        </div>

        {/* ══════════════ PREMIUM CONTROLS PANEL (UI Layout) ══════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-2xl backdrop-blur-md shadow-2xl">
          {/* 1. Ultra-Premium Search Box UI Structure */}
          <div className="relative lg:col-span-5 w-full group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors duration-200"
              size={14}
            />
            <input
              type="text"
              placeholder="Search by arena title or location..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-[#a3e635]/60 focus:ring-1 focus:ring-[#a3e635]/20 transition-all duration-200"
            />
          </div>

          {/* 2. Custom Structured Sorting Box UI Component */}
          <div className="relative lg:col-span-3 w-full group">
            <FaSortAmountDown
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#a3e635] pointer-events-none"
              size={13}
            />
            <select
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm font-semibold text-zinc-400 appearance-none focus:outline-none focus:border-[#a3e635]/60 transition-all duration-200 cursor-pointer"
              defaultValue="default"
            >
              <option value="default">Sort: Default Matrix</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-[10px]">
              <FaChevronDown />
            </div>
          </div>

          {/* 3. Decorative Utility Context Layout Spacer */}
          <div className="hidden lg:flex items-center justify-end lg:col-span-4 px-2 text-zinc-500 gap-2 text-xs font-bold uppercase tracking-wider select-none">
            <FaSlidersH size={13} className="text-[#a3e635]/80" />
            <span>Refine booking ecosystem</span>
          </div>
        </div>

        {/* ══════════════ SPORTS CATEGORIES CHIPS BAR  ══════════════ */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max">
            {CATEGORIES.map((category, index) => {
              // Setting the first chip as active for layout layout visualization
              const isSelected = index === 0;
              return (
                <button
                  key={category}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#a3e635] border-[#a3e635] text-black shadow-[0_4px_25px_rgba(163,230,53,0.25)]'
                      : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════ DYNAMIC FACILITIES CARDS RENDERING GRID ══════════════ */}
        {facilities && facilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility._id || facility.id}
                facility={facility}
              />
            ))}
          </div>
        ) : (
          /* Ultra-Premium Empty Fallback State Layout if database returns empty */
          <div className="w-full rounded-3xl border border-zinc-900 bg-zinc-900/10 py-20 px-4 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-5 shadow-xl">
              <FaInbox size={22} className="text-zinc-500" />
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-wider mb-2">
              No Venues Available
            </h3>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">
              We couldn&apos;t retrieve any records from the booking servers
              right now. Please populate your database collection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllFacilitiesPage;
