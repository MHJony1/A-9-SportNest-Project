'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaSearch,
  FaSlidersH,
  FaSortAmountDown,
  FaChevronDown,
  FaInbox,
} from 'react-icons/fa';
import FacilityCard from '@/components/FacilityCard';
import SkeletonLoader from '@/components//SkeletonLoader';

// categories
const CATEGORIES = [
  'All Arenas',
  'Football',
  'Cricket',
  'Badminton',
  'Volleyball',
  'Basketball',
  'Tennis',
];
const LIMIT = 9;

// debounce function
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}


// MAIN CLIENT COMPONENT 
export default function FacilitiesClient() {
  const router = useRouter();
  const pathname = usePathname();

  // ── UI State ──
  const [search, setSearch] = useState('');
  const [sport, setSport] = useState('All Arenas');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);

  // ── Data State ──
  const [facilities, setFacilities] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  // ── Refs ──
  const isFirstRender = useRef(true);
  const prevFilters = useRef({ debouncedSearch, sport, sort });

  // ── Single unified useEffect
  useEffect(() => {
    // Check if filters changed (not page)
    const filtersChanged =
      prevFilters.current.debouncedSearch !== debouncedSearch ||
      prevFilters.current.sport !== sport ||
      prevFilters.current.sort !== sort;

    // Update ref
    prevFilters.current = { debouncedSearch, sport, sort };

    // If filter changed and not first render, reset page to 1
    let activePage = page;
    if (filtersChanged && !isFirstRender.current) {
      activePage = 1;
      setPage(1); 
    }

    isFirstRender.current = false;

    // Build query params
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (sport !== 'All Arenas') params.set('sport', sport);
    if (sort !== 'default') params.set('sort', sort);
    if (activePage > 1) params.set('page', String(activePage));
    params.set('limit', String(LIMIT));

    // Update URL Sync without scroll reset
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });

    // Fetch data from unified backend pipeline
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const res = await fetch(`${cleanUrl}/facilities?${queryString}`);
        if (!res.ok) throw new Error('Failed to fetch data layers');

        const data = await res.json();

        setFacilities(data.facilities || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Fetch error ecosystem deployment:', err);
        setFacilities([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sport, sort, page]);

  // ─── RENDER ───
  return (
    <main className="min-h-screen pt-32 pb-20 px-5 sm:px-8 relative bg-transparent text-white">
      <div className="relative max-w-7xl mx-auto w-full z-10 space-y-10">
        {/* ══ HEADER ══ */}
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

        {/* ══ CONTROLS PANEL ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-2xl backdrop-blur-md shadow-2xl">
          {/* Search */}
          <div className="relative lg:col-span-5 w-full group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#a3e635] transition-colors duration-200"
              size={14}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by arena title or location..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-[#a3e635]/60 focus:ring-1 focus:ring-[#a3e635]/20 transition-all duration-200"
            />
          </div>

          {/* Sort */}
          <div className="relative lg:col-span-3 w-full group">
            <FaSortAmountDown
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
              size={13}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm font-semibold text-zinc-400 appearance-none focus:outline-none focus:border-[#a3e635]/60 transition-all duration-200 cursor-pointer"
            >
              <option value="default">Sort: Default Matrix</option>
              <option value="low-to-high">Price: Low → High</option>
              <option value="high-to-low">Price: High → Low</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-[10px]" />
          </div>

          {/* Venue Count */}
          <div className="hidden lg:flex items-center justify-end lg:col-span-4 px-2 text-zinc-500 gap-2 text-xs font-bold uppercase tracking-wider select-none">
            <FaSlidersH size={13} className="text-[#a3e635]/80" />
            <span>{loading ? 'Loading...' : `${total} venues found`}</span>
          </div>
        </div>

        {/* ══ CATEGORY CHIPS ══ */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSport(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                  sport === cat
                    ? 'bg-[#a3e635] border-[#a3e635] text-black shadow-[0_4px_25px_rgba(163,230,53,0.25)]'
                    : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/*  CARDS GRID  */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(LIMIT)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : facilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {facilities.map((fac) => (
              <FacilityCard key={fac._id || fac.id} facility={fac} />
            ))}
          </div>
        ) : (
          <div className="w-full rounded-3xl border border-zinc-900 bg-zinc-900/10 py-20 px-4 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-5 shadow-xl">
              <FaInbox size={22} className="text-zinc-500" />
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-wider mb-2">
              No Venues Found
            </h3>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* ══ PAGINATION ══ */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider disabled:opacity-30 hover:border-[#a3e635]/50 hover:text-white transition-all cursor-pointer"
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const show =
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - page) <= 1;
              if (!show) {
                if (pageNum === 2 || pageNum === totalPages - 1)
                  return (
                    <span key={i} className="text-zinc-600 text-xs px-1">
                      …
                    </span>
                  );
                return null;
              }
              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                    page === pageNum
                      ? 'bg-[#a3e635] border-[#a3e635] text-black shadow-[0_4px_20px_rgba(163,230,53,0.25)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider disabled:opacity-30 hover:border-[#a3e635]/50 hover:text-white transition-all cursor-pointer"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
