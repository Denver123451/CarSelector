'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IMakesResponse } from '@/types/typs';

export function useCarSelector() {
  const [car, setCar] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const { data, error, isLoading } = useQuery<IMakesResponse>({
    queryKey: ['makes'],
    queryFn: async () => {
      const res = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    },
  });

  const makes = data ? data.Results : [];

  const years = useMemo(() => [...Array(11).keys()].map((n) => n + 2015), []);
  const isDisabled = !car || !year;
  const link = isDisabled ? '#' : `/SuccessPage/${car}/${year}`;

  return {
    car,
    setCar,
    year,
    setYear,
    makes,
    years,
    isDisabled,
    link,
    isLoading,
    isError: error,
  };
}
