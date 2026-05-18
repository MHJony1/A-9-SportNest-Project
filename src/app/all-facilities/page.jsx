import { fetchFacilities } from '@/lib/facilities/data';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import FacilityCard from '@/components/FacilityCard';

const AllFacilitiesPage = async () => {
  // Fetching data from your database function
  const facilities = await fetchFacilities();

  return (

    <main className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-5 sm:px-8 relative">
      {/* ── Background Ambient Layers (Matches Banner/Hero style) ── */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, #a3e635 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-lime-400/[0.03] blur-[120px] pointer-events-none z-0" />

      {/* ── Main Layout Container ── */}
      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Page Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-lime-400 text-xs font-bold tracking-widest uppercase">
                Live Availability
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              All <span className="text-lime-400">Facilities</span>
            </h1>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed md:text-right">
            Explore and reserve premium pitches, courts, and sports complexes
            instantly.
          </p>
        </div>

        {/* ── Facilities Grid ── */}
        {facilities && facilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {facilities.map((facility) => (
             <FacilityCard key={facility._id || facility.id} facility={facility} />
            ))}
          </div>
        ) : (
          /* Empty / Fallback State Layout */
          <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-900/20 py-16 px-4 flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4 shadow-inner">
              ⚠️
            </div>
            <p className="text-zinc-500 text-sm max-w-xs">
              We couldn&apos;t retrieve any records from the booking servers
              right now.
            </p>
            <p className="text-zinc-500 text-sm max-w-xs">
              We couldn&apos;t retrieve any records from the booking servers
              right now.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllFacilitiesPage;
