'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-[#9EFF00] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 404 Big Neon Badge */}
      <div className="relative mb-4">
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-[#9EFF00] to-[#76BC00] select-none tracking-tighter drop-shadow-[0_0_30px_rgba(158,255,0,0.2)]">
          404
        </h1>
      </div>

      {/* Friendly Error Messages */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
        Oops! Shot Wide of the Goal
      </h2>
      <p className="text-gray-400 max-w-md text-sm md:text-base mb-10 leading-relaxed">
        The arena or facility you are looking for doesn&apos;t exist, has been relocated, or is currently undergoing maintenance. Let&apos;s get you back in the game!
      </p>

      {/* Premium Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full sm:w-auto">
        {/* Previous Page Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full sm:w-auto px-6 py-3 bg-neutral-900 border border-neutral-800 text-gray-300 font-semibold rounded-xl text-sm transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-700 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Go Back
        </button>

        {/* Back to Home Button (Theme Matching Neon Green) */}
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 bg-[#9EFF00] text-black font-bold rounded-xl text-sm transition-all duration-300 hover:bg-[#b0ff33] hover:shadow-[0_0_25px_rgba(158,255,0,0.4)] active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
}