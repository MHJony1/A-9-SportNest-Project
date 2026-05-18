export const fetchFacilities = async () => {
  const res = await fetch("http://localhost:8000/facilities");
  const data = await res.json();
  return data || [];
};