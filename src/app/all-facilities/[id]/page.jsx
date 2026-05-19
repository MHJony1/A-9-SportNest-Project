import FacilityDetailsClient from '@/components/FacilityDeatilsClient';
import { fetchFacilityById } from '@/lib/facilities/data';
import { notFound } from 'next/navigation';
import React from 'react';

const FacilitiesDetailsPage = async ({ params }) => {
  const { id } = await params;
  const facility = await fetchFacilityById(id);

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
