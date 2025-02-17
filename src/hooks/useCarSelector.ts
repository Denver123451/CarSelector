import { useState, useMemo } from 'react';
import useSWR from 'swr';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCarSelector() {
  const [car, setCar] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const { data, error } = useSWR(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
      fetcher
  );

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
    isLoading: !data && !error,
    isError: error,
  };
}
