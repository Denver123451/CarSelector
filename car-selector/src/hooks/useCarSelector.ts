import { useState, useEffect, useMemo } from 'react';
import { IMake } from '@/types/typs';

export function useCarSelector() {
  const [car, setCar] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [makes, setMakes] = useState<IMake[]>([]);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        );
        if (!res.ok) throw new Error('Failed to fetch makes');
        const data = await res.json();
        setMakes(data.Results);
      } catch (error) {
        console.error('Error fetching makes:', error);
      }
    };
    fetchMakes();
  }, []);

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
  };
}
