'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Users,
  DollarSign,
  Award,
  Flame,
  ArrowLeft,
} from 'lucide-react';

const FacilityDetailsClient = ({ facility }) => {
  const router = useRouter();

  // Destructuring the facility object
  const {
    name = 'Premium Sports Arena',
    facility_type = 'Sports',
    location = 'Dhaka, Bangladesh',
    price_per_hour = 0,
    capacity = 0,
    available_slots = [],
    description = '',
    image = 'https://images.unsplash.com/photo-1540379708242-14a809bef941?q=80&w=1460',
    booking_count = 0,
  } = facility || {};

  const [bookingDuration, setBookingDuration] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to render stars
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className="w-4 h-4 text-lime-400 fill-lime-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  const onSubmit = (data) => {
    const totalFee = price_per_hour * bookingDuration;
    const bookingPayload = {
      ...data,
      duration: bookingDuration,
      totalFee,
      facilityId: facility?._id,
    };
    console.log('Secure Booking Payload Dispatched:', bookingPayload);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto text-gray-100">
      {/* Top Header Interactive Directional Anchor */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-lime-400 mb-8 transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Facilities</span>
      </motion.button>

      {/* Grid Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Aspect: High-End Image Presentation & Title Data Nodes */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative h-80 md:h-115 w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/3 group">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Context Badge */}
            <div className="absolute top-4 left-4 bg-lime-400 text-black font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-xl">
              {facility_type} Arena
            </div>

            {/* Dynamic Reservation Counter Indicator */}
            {booking_count >= 0 && (
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/8 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 text-lime-400 shadow-xl">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>{booking_count} Match Slots Reserved Recently</span>
              </div>
            )}
          </div>

          {/* Facility Title */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {name}
            </h1>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base font-medium">
                <MapPin className="w-5 h-5 text-lime-400 shrink-0" />
                <span>{location}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/3 px-3 py-1.5 rounded-xl border border-white/5">
                  {renderStars()}
                  <span className="text-xs font-black text-lime-400 ml-1">
                    5.0
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/3 px-2.5 py-2 rounded-lg border border-white/5">
                  Verified Venue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Aspect: Booking Module */}
        <div className="lg:col-span-5 bg-neutral-900/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-6">
          {/* Facility Price */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-extrabold mb-1">
              Hourly Base Rate
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white tracking-tight">
                ${price_per_hour}
              </span>
              <span className="text-gray-400 font-semibold text-xs">/ hr</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Target Destination */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">
                Target Destination
              </label>
              <input
                type="text"
                value={name}
                disabled
                className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-400 font-semibold focus:outline-none cursor-not-allowed select-none"
              />
            </div>

            {/* Calendar Selector Frame */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">
                Select Match Date
              </label>
              <input
                type="date"
                {...register('matchDate', {
                  required: 'Reservation timeline window must be chosen',
                })}
                className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-400/30 transition-colors"
              />
              {errors.matchDate && (
                <span className="text-xs font-bold text-rose-500 block mt-1">
                  {errors.matchDate.message}
                </span>
              )}
            </div>

            {/* Available Slots */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">
                Available Slots
              </label>
              <select
                {...register('bookingSlot', {
                  required: 'Active game slot assignment is mandatory',
                })}
                className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-400/30 transition-colors appearance-none"
                defaultValue=""
              >
                <option value="" disabled className="bg-neutral-900">
                  Choose your match timing...
                </option>
                {available_slots?.map((slot, index) => (
                  <option key={index} value={slot} className="bg-neutral-900">
                    {slot}
                  </option>
                ))}
              </select>
              {errors.bookingSlot && (
                <span className="text-xs font-bold text-rose-500 block mt-1">
                  {errors.bookingSlot.message}
                </span>
              )}
            </div>

            {/* Duration Control */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-wider">
                <span>Duration Control</span>
                <span className="text-lime-400 font-black text-sm">
                  {bookingDuration} Hour{bookingDuration > 1 ? 's' : ''}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={bookingDuration}
                onChange={(e) => setBookingDuration(Number(e.target.value))}
                className="w-full accent-lime-400 h-1.5 bg-white/8 rounded-lg cursor-pointer"
              />
            </div>

            {/* Total Combined Fee */}
            <div className="bg-white/2 border border-white/4 rounded-xl p-4 flex justify-between items-center shadow-inner">
              <div className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
                <Clock className="w-4 h-4 text-lime-400" />
                <span>Total Combined Fee</span>
              </div>
              <span className="text-2xl font-black text-lime-400">
                ${price_per_hour * bookingDuration}
              </span>
            </div>

            {/* Lock Slot & Book Now */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black py-4 rounded-xl text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black" />
              Lock Slot & Confirm Booking
            </motion.button>
          </form>
        </div>
      </div>

      {/* Bottom Segment: Minimalist High Quality Info Overview Block */}
      <div className="mt-15 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/4">
        <div className="lg:col-span-7 space-y-10">
          {/* Section 1: Detailed Overview text */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-lime-400" /> Facility Overview
            </h2>
            <p className="text-gray-400 leading-relaxed text-base font-normal">
              {description ||
                'A premier arena engineered specifically for high-intensity competition, tactical drills, and fluid matches. Built using pro-level specifications for flawless performance and dynamic player safety profiles.'}
            </p>
          </div>

          {/* Section 2: Technical Specs structured nicely with micro-cards */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-lime-400" /> Verified Technical
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: `Optimal Player Capacity: Max ${capacity} Members`,
                  icon: Users,
                },
                {
                  label: `Base Token Fee: $${price_per_hour}/hour standard`,
                  icon: DollarSign,
                },
                {
                  label: 'Premium Multi-layered Shock Absorbent Surface',
                  icon: ShieldCheck,
                },
                {
                  label: 'High Lumens Directional Flood Lighting Grid',
                  icon: Zap,
                },
                {
                  label: 'High-density Anti-collision Perimeter Guard rails',
                  icon: ShieldCheck,
                },
                {
                  label: 'First Aid & Equipment Management Station Available',
                  icon: Activity,
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/1 border border-white/4 px-4 py-4 rounded-xl shadow-sm hover:border-white/8 transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-lime-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-300">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Regulations card layout */}
          <div className="bg-white/1 border border-white/4 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-lime-400 flex items-center gap-2">
              ⚠️ Regulations & Execution Directives
            </h3>
            <ul className="space-y-3 text-sm text-gray-400 list-none pl-1">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 shrink-0"></span>
                <span>
                  Appropriate court footwear is strictly required to preserve
                  asset structure.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 shrink-0"></span>
                <span>
                  Please notify the complex hub managers at least fifteen
                  minutes prior to game initialization.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 shrink-0"></span>
                <span>
                  Cancellations or modification routines must occur at least 24
                  hours prior to designated schedules.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsClient;
