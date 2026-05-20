'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import BookingCancelAlert from '@/components/BookingCancelAlert'; 
import {
  CalendarDays,
  Clock,
  MapPin,
  DollarSign,
  Gamepad2,
  ShieldAlert,
} from 'lucide-react';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Session Management
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (isPending || !user?.email) {
        if (!isPending && !user?.email) setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const serverUrl =
          process.env.NEXT_PUBLIC_SERVER_URL;

        const res = await fetch(`${serverUrl}/bookings?email=${user.email}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (error) {
        console.error('Operational booking fetch exception:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [user?.email, isPending]);

  // Handle Booking Cancellation
  const handleCancelSuccess = (deletedId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b._id !== deletedId),
    );
  };

  // Security Check
  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#a3e635] font-sans antialiased">
        <div className="animate-pulse tracking-widest text-xs font-black uppercase">
          Synchronizing Session Matrix...
        </div>
      </div>
    );
  }

  // Authentication Check
  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-32 px-4 flex items-center justify-center text-gray-100 font-sans antialiased">
        <div className="bg-[#171717]/20 border border-dashed border-rose-500/20 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Authentication Required
            </h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              Please sign in to your PlayNest digital identity to monitor or
              analyze your tactical arena allocations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-gray-100 selection:bg-[#a3e635] selection:text-black font-sans antialiased">
      {/* Context Header Section */}
      <div className="mb-12 space-y-3 border-b border-white/5 pb-8">
        <div className="flex items-center gap-2 text-[#a3e635] text-xs font-black uppercase tracking-widest pl-0.5">
          <Gamepad2 className="w-4 h-4" />
          <span>Tactical Hub Registry</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
          My <span className="text-[#a3e635]">Bookings</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-400 font-medium max-w-xl leading-relaxed">
          Monitor your active arena allocations, track operational session
          nodes, or manage dynamic match configurations synced across the
          system.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-5">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="h-32 w-full bg-[#171717]/30 border border-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#171717]/20 border border-dashed border-white/10 rounded-2xl p-16 text-center max-w-lg mx-auto space-y-5 shadow-2xl"
        >
          <div className="w-12 h-12 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-5 h-5 text-[#a3e635]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              No Active Allocations
            </h3>
            <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
              Your match timeline matrix is currently empty. Initialize slot
              reservations from the arena portal.
            </p>
          </div>
        </motion.div>
      ) : (
        /* Premium Luxury Bookings List */
        <div className="space-y-5">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#171717]/40 backdrop-blur-xl rounded-2xl border border-white/5 p-5 md:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] hover:border-[#a3e635]/20 hover:shadow-[0_20px_50px_rgba(163,230,53,0.03)] transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Image & Info Card Left Wing */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full md:w-auto">
                <div className="relative h-20 w-24 sm:h-24 sm:w-28 rounded-xl overflow-hidden border border-white/5 bg-neutral-900 shrink-0 shadow-xl group-hover:border-white/10 transition-colors">
                  <Image
                    src={
                      booking.image ||
                      'https://images.unsplash.com/photo-1540379708242-14a809bef941?q=80&w=1460'
                    }
                    alt={booking.facilityName}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    sizes="112px"
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">
                      {booking.facilityName}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-[#a3e635]/10 text-[#a3e635] px-2.5 py-0.5 rounded border border-[#a3e635]/20 shadow-sm">
                      {booking.status || 'Pending'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400 font-semibold tracking-wide">
                    <div className="flex items-center gap-1.5 bg-white/2 px-2.5 py-1 rounded-lg border border-white/4">
                      <MapPin className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/2 px-2.5 py-1 rounded-lg border border-white/4">
                      <CalendarDays className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />
                      <span className="text-gray-200">
                        {booking.bookingDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/2 px-2.5 py-1 rounded-lg border border-white/4">
                      <Clock className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />
                      <span>
                        {booking.slot}{' '}
                        <span className="text-gray-500 font-extrabold ml-0.5">
                          ({booking.duration}h)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Fee & Action Controls Right Wing */}
              <div className="flex md:flex-col sm:flex-row items-center sm:justify-between md:justify-center justify-between gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="text-left md:text-right">
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 font-black mb-0.5">
                    Combined Node Fee
                  </p>
                  <div className="flex items-center text-xl md:text-2xl font-black text-[#a3e635] tracking-tight">
                    <DollarSign className="w-4 h-4 md:w-5 md:h-5 -mr-0.5 shrink-0" />
                    <span>{booking.totalFee}</span>
                  </div>
                </div>

                {/* Confirm Cancel Button */}
                <BookingCancelAlert
                  booking={booking}
                  onCancelSuccess={handleCancelSuccess}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
