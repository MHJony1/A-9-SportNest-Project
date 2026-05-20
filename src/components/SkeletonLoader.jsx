import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full bg-zinc-900/40 rounded-3xl border border-zinc-800/50 overflow-hidden animate-pulse shadow-xl">
      {/* 1. Image and Price/Category badge placeholders */}
      <div className="relative h-52 bg-zinc-800/60 w-full">
        {/* Category badge */}
        <div className="absolute top-4 left-4 h-6 w-24 bg-zinc-700/50 rounded-full" />
        {/* Price badge */}
        <div className="absolute top-4 right-4 h-8 w-20 bg-zinc-700/50 rounded-xl" />
      </div>

      {/* 2. Content area placeholders */}
      <div className="p-6 space-y-4">
        {/* Title or Venue name */}
        <div className="h-7 bg-zinc-800/70 rounded-lg w-3/4 mt-2" />

        {/* Description / Icon & Text lines */}
        <div className="space-y-3 pt-2">
          {/* Location line */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-zinc-800/60 rounded-full shrink-0" />
            <div className="h-4 bg-zinc-800/50 rounded w-1/2" />
          </div>
          {/* Capacity line */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-zinc-800/60 rounded-full shrink-0" />
            <div className="h-4 bg-zinc-800/50 rounded w-1/3" />
          </div>
          {/* Confirmation status line */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-zinc-800/60 rounded-full shrink-0" />
            <div className="h-4 bg-zinc-800/50 rounded w-2/3" />
          </div>
        </div>

        {/* 3. Action button placeholder (e.g., BOOK NOW) */}
        <div className="pt-4">
          <div className="h-12 bg-zinc-800/80 rounded-2xl w-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;