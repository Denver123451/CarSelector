'use client';

import { useQuery } from '@tanstack/react-query';
import { ITableData } from '@/types/typs';

export function useVehicleModels(makeId: string, year: string) {
  const enabled = Boolean(makeId && year);

  const { data, error, isLoading } = useQuery<ITableData>({
    queryKey: ['vehicleModels', makeId, year],
    queryFn: async () => {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const json = await res.json();

      if (!json.Results) {
        throw new Error('No data found for the selected make and year.');
      }

      return json;
    },
    enabled,
  });

  const cars = data?.Results || [];

  const errorMsg = error instanceof Error ? error.message : null;

  return {
    cars,
    loading: isLoading,
    error: errorMsg,
  };
}
