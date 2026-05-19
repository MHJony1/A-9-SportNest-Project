import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth'; 

// Dynamic API fetch based entirely on the authenticated owner's email context
async function getMyFacilities(ownerEmail) {
  if (!ownerEmail) return [];

  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL;

  try {
    const res = await fetch(
      `${serverUrl}/manage-facilities?email=${ownerEmail}`,
      {
        cache: 'no-store', 
      },
    );

    if (!res.ok) {
      throw new Error(
        'Failed to retrieve structured asset listings from data layer',
      );
    }
    return res.json();
  } catch (error) {
    console.error('Operational layer error fetching system assets:', error);
    return [];
  }
}

const ManageFacilitiesPage = async () => {
  // Retrieve the active tracking context via Better Auth on the server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Extract the specific email string from the context profile payload safely
  const loggedInUserEmail = session?.user?.email;

  // Protect the route: If no tracking context profile exists, gracefully halt execution
  if (!loggedInUserEmail) {
    return (
      <div className="min-h-screen text-white px-6 pt-32 pb-12 font-sans flex items-center justify-center">
        <div className="bg-[#14161d] rounded-2xl p-8 text-center border border-zinc-800/60 max-w-md w-full">
          <div className="text-3xl mb-3">🔒</div>
          <p className="text-zinc-300 text-lg font-semibold">
            Access Verification Required
          </p>
          <p className="text-zinc-500 text-sm mt-1 mb-4">
            {' '}
            Please authenticate your account session to handle asset
            administrative controls.
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#a3e635] hover:bg-[#84c225] text-black text-sm font-bold px-4 py-2 rounded-xl transition-all"
          >
            Proceed to Login
          </Link>
        </div>
      </div>
    );
  }

  const myFacilities = await getMyFacilities(loggedInUserEmail);

  return (
    <div className="min-h-screen text-white px-6 pt-32 pb-12 font-sans selection:bg-[#a3e635] selection:text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-zinc-800/60">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Manage My <span className="text-[#a3e635]">Facilities</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Review, edit, or remove venues listed under:{' '}
              <span className="text-zinc-200 font-medium underline decoration-[#a3e635]">
                {loggedInUserEmail}
              </span>
            </p>
          </div>
          <Link href="/add-facilities">
            <button className="bg-[#a3e635] hover:bg-[#84c225] text-black font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-[#a3e635]/10">
              <span className="text-lg">+</span> Add New
            </button>
          </Link>
        </div>

        {/* Facilities Grid Area */}
        <div className="grid grid-cols-1 gap-5">
          {myFacilities.length === 0 ? (
            <div className="bg-[#14161d] rounded-2xl p-12 text-center border border-zinc-800/60 max-w-xl mx-auto w-full">
              <div className="text-4xl mb-3">🏟️</div>
              <p className="text-zinc-300 text-lg font-semibold">
                No facilities added yet!
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Any venue you list via the Add Facility form will show up right
                here.
              </p>
              <Link
                href="/add-facilities"
                className="inline-block mt-5 text-sm font-bold text-[#a3e635] hover:underline"
              >
                Create your first listing &rarr;
              </Link>
            </div>
          ) : (
            myFacilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-[#14161d] rounded-2xl p-5 border border-zinc-800/40 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-5 hover:border-zinc-700/50 transition-all group"
              >
                {/* Left Section: Image and Facility Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                  <div className="w-full sm:w-28 sm:h-28 h-44 rounded-xl overflow-hidden bg-zinc-900 relative shrink-0 border border-zinc-800">
                    <Image
                      src={
                        facility.image ||
                        'https://images.unsplash.com/photo-1540379708242-14a809bef941?q=80&w=500'
                      }
                      alt={facility.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 112px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={true}
                    />
                  </div>

                  {/* Text Information Info */}
                  <div className="space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {facility.name}
                      </h3>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-[#a3e635]/10 text-[#a3e635] rounded-md uppercase tracking-wider border border-[#a3e635]/20">
                        {facility.facility_type || 'Sports'}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-sm flex items-center gap-1.5">
                      <span className="text-[#a3e635]">📍</span>{' '}
                      {facility.location}
                    </p>

                    {/* Information Meta Bar */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-sm text-zinc-300">
                      <span className="font-bold text-[#a3e635] text-base">
                        ${facility.price_per_hour || facility.price}
                        <span className="text-xs text-zinc-500 font-normal">
                          /hr
                        </span>
                      </span>
                      <span className="text-zinc-700">|</span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        👥{' '}
                        <strong className="text-zinc-200 font-medium">
                          {facility.capacity || 0}
                        </strong>{' '}
                        players
                      </span>
                      <span className="text-zinc-700">|</span>
                      <span className="text-[#a3e635] bg-[#a3e635]/5 px-2 py-0.5 rounded text-xs border border-[#a3e635]/10 font-medium">
                        0 Bookings
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section: Interactive Action Controls */}
                <div className="flex md:flex-col sm:flex-row items-center justify-end gap-2.5 border-t md:border-t-0 border-zinc-800/60 pt-4 md:pt-0 min-w-30">
                  <button className="w-full sm:w-auto md:w-full text-zinc-300 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all text-sm border border-zinc-800 hover:border-zinc-700">
                    ✏️ Edit
                  </button>
                  <button className="w-full sm:w-auto md:w-full text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all text-sm border border-rose-500/10 hover:border-rose-500">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageFacilitiesPage;
