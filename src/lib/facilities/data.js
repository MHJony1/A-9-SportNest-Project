// Fetch All Facilities
export const fetchFacilities = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`);
    if (!res.ok) {
      throw new Error('Failed to fetch facilities');
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching facilities:', error);
    return [];
  }
};

// Fetch Featured Facilities
export const featuredFacilities = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
    if (!res.ok) {
      throw new Error('Failed to fetch featured facilities');
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching featured facilities:', error);
    return [];
  }
};

 // Fetch Single Facility
 export const fetchFacilityById = async (id, headerList) => {
  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const cookieHeader = headerList?.get('cookie') || '';

    const res = await fetch(`${serverUrl}/facilities/${id}`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader, 
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Facility details fetched properly na');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching single facility data:', error);
    return null;
  }
};
