'use client';

import React, { useState } from 'react';
import {
  Building2,
  Layers,
  Image as ImageIcon,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Mail,
  FileJson,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const AddFacilityClient = () => {
  const { data: session, status } = useSession();
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Time Slots
  const timeSlotsOptions = [
    "07:00-09:00 'AM'",
    "09:00-11:00 'AM'",
    "11:00-13:00 'AM'",
    "15:00-17:00 'PM'",
    "17:00-19:00 'PM'",
    "19:00-21:00 'PM'",
  ];

  // Slot Selection
  const handleSlotToggle = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((item) => item !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Session Check
    if (status === 'unauthenticated' || !session?.user?.email) {
      toast.error(
        '⚠️ Unauthorized Access! Please login to secure your session context.',
      );
      return;
    }

    if (selectedSlots.length === 0) {
      alert('⚠️ Minimum one premium available slot selection is required!');
      return;
    }

    const formData = new FormData(e.target);
    const allFacilities = Object.fromEntries(formData.entries());

    // Data Type Conversion
    allFacilities.price_per_hour = Number(allFacilities.price_per_hour);
    allFacilities.capacity = Number(allFacilities.capacity);

    //  Selected Dynamic slots
    allFacilities.available_slots = selectedSlots;
    allFacilities.owner_email = session.user.email;
    allFacilities.booking_count = 0;

    console.log('Final Sync Data Payload:', allFacilities);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-facilities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(allFacilities),
        },
      );

      const data = await res.json();
      console.log('Server Response Track:', data);

      if (res.ok) {
        toast.success('✨ Luxury Arena Successfully Published and Synced!');
        e.target.reset();
        setSelectedSlots([]);
      }
    } catch (error) {
      console.error('Transmission failure error:', error);
    }
  };

  // Loading State
  if (status === 'loading') {
    return (
      <div className="w-full min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#CCFF00] animate-spin" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            Authenticating User Node...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-transparent font-sans text-white pt-36 pb-20 px-4 sm:px-6 md:px-8 selection:bg-[#CCFF00] selection:text-black">
      {/* Page Header */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#CCFF00]/10 border border-[#CCFF00]/20 px-4 py-1.5 rounded-full text-[#CCFF00] text-xs font-bold tracking-widest uppercase animate-pulse">
          <Sparkles size={13} /> Elite Arena Protocol
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
          Add New <span className="text-[#CCFF00]">Facility</span>
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed tracking-wide">
          Deploy audited sports ecosystem variables, structural capacities, and
          microservice booking matrices.
        </p>
      </div>

      {/* Main Luxury Container Form */}
      <div className="w-full max-w-4xl mx-auto bg-[#121212] border border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Facility Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
                <Building2 size={14} className="text-[#CCFF00]" /> Facility Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter premium facility name"
                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all text-sm font-medium"
              />
            </div>

            {/* Facility Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
                <Layers size={14} className="text-[#CCFF00]" /> Facility Type
              </label>
              <div className="relative">
                <select
                  name="facility_type"
                  required
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#CCFF00] transition-all cursor-pointer appearance-none text-sm font-medium"
                >
                  <option value="" className="bg-zinc-950 text-zinc-500">
                    Select facility type
                  </option>
                  <option value="Football" className="bg-zinc-950">
                    Football
                  </option>
                  <option value="Cricket" className="bg-zinc-950">
                    Cricket
                  </option>
                  <option value="Tennis" className="bg-zinc-950">
                    Tennis
                  </option>
                  <option value="Badminton" className="bg-zinc-950">
                    Badminton
                  </option>
                  <option value="Badminton" className="bg-zinc-950">
                    Volleyball
                  </option>
                  <option value="Badminton" className="bg-zinc-950">
                    Basketball
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500">
                  ↓
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
                <ImageIcon size={14} className="text-[#CCFF00]" /> Image
                Showcase URL
              </label>
              <input
                type="url"
                name="image"
                required
                placeholder="Paste imgbb cloud production URL"
                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all text-sm font-medium"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
                <MapPin size={14} className="text-[#CCFF00]" /> Location Base
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g., Gulshan, Dhaka"
                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all text-sm font-medium"
              />
            </div>

            {/* Price Per Hour */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
                <DollarSign size={14} className="text-[#CCFF00]" /> Hourly Fee
                (USD)
              </label>
              <input
                type="number"
                name="price_per_hour"
                required
                placeholder="e.g., 65"
                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all text-sm font-medium"
              />
            </div>

            {/* Capacity */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
                <Users size={14} className="text-[#CCFF00]" /> Squad Capacity
              </label>
              <input
                type="number"
                name="capacity"
                required
                placeholder="Optimal player scale"
                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all text-sm font-medium"
              />
            </div>

            {/* Dynamic Owner Email Display (Read Only) */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 px-1">
                <Mail size={14} className="text-zinc-600" /> Creator Account
              </label>
              <input
                type="email"
                disabled
                value={session?.user?.email || 'No session context initialized'}
                className="w-full bg-zinc-950/40 border border-zinc-900 text-zinc-500 rounded-xl px-4 py-3.5 cursor-not-allowed font-medium text-sm select-none"
              />
            </div>
          </div>

          {/* Available Slots Multi-Dropdown System */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
              <Clock size={14} className="text-[#CCFF00]" /> Select Active Time
              Slots
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlotsOptions.map((slot) => {
                const isSelected = selectedSlots.includes(slot);
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => handleSlotToggle(slot)}
                    className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all duration-200 uppercase tracking-wider text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                        : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description Specification */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 px-1">
              <FileJson size={14} className="text-[#CCFF00]" /> Infrastructure
              Specs & Guidelines
            </label>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="State structural floor breakdown, lighting grid capacity, and stadium boundary rules..."
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all resize-none font-medium text-sm leading-relaxed"
            ></textarea>
          </div>

          {/* Action Button - Placed at Bottom Right Corner */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#CCFF00] text-black text-xs font-extrabold tracking-wider uppercase px-9 py-4 rounded-xl hover:bg-[#b0df00] transition-all hover:shadow-[0_0_25px_rgba(204,255,0,0.15)] active:scale-[0.98] cursor-pointer"
            >
              Add Premium Facility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacilityClient;
