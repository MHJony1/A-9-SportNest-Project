import FacilityDetailsClient from '@/components/FacilityDeatilsClient';
import { fetchFacilityById } from '@/lib/facilities/data';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import React from 'react';

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const headerList = await headers(); 

    const facility = await fetchFacilityById(id, headerList); 

    if (!facility) {
      return {
        title: 'Facility | PlayNest',
        description: 'Sports facility details',
      };
    }

    return {
      title: `${facility.name} | PlayNest`,
      description: facility.description || 'Book this facility on PlayNest',
    };
  } catch (error) {
    return {
      title: 'Facility | PlayNest',
      description: 'Sports facility details on PlayNest',
    };
  }
}


const FacilitiesDetailsPage = async ({ params }) => {
  const { id } = await params;

  const headerList = await headers();

  const cookieHeader = headerList.get('cookie') || '';
  if (!cookieHeader.includes('better-auth.session_token')) {
    redirect('/login');
  }

  const facility = await fetchFacilityById(id, headerList);

  if (!facility) {
    notFound();
  }

  const serializedFacility = {
    ...facility,
    _id: facility._id?.toString(),
  };

  return <FacilityDetailsClient facility={serializedFacility} />;
};

export default FacilitiesDetailsPage;
