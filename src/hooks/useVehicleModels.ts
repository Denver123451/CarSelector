import useSWR from 'swr';
import { ICar } from '@/types/typs';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const data = await res.json();
  if (!data.Results || data.Count === 0) {
    throw new Error('No data found for the selected make and year.');
  }
  return data;
};

export function useVehicleModels(makeId: string, year: string) {

  const shouldFetch = makeId && year;

  const { data, error } = useSWR(
      shouldFetch
          ? `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
          : null,
      fetcher
  );

  const cars: ICar[] = data?.Results || [];
  const loading = !data && !error;

  return { cars, loading, error: error ? error.message : null };
}
