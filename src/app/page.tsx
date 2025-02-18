'use client';

import Image from 'next/image';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomButton from '@/components/CustomButton';
import { useCarSelector } from '@/hooks/useCarSelector';
import { IMake } from '@/types/typs';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function Home() {
  const { car, setCar, year, setYear, makes, years, isDisabled, link, isLoading, isError } =
    useCarSelector();

  const handleChange = (event: SelectChangeEvent) => setCar(event.target.value as string);
  const handleChangeYear = (event: SelectChangeEvent) => setYear(Number(event.target.value));

  const [state, setState] = useState(false);

  const onClick = () => {
    setState(!state);
  };

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Image
              className="dark:invert"
              src="/car.webp"
              alt="car picture"
              width={300}
              height={150}
              priority
            />

            <h2 className="text-sky-500 hover:text-sky-800 text-3xl">Car Selector</h2>

            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="make-select-label">Make</InputLabel>
                <Select
                  labelId="make-select-label"
                  id="make-select"
                  value={car || ''}
                  onChange={handleChange}
                >
                  {makes.length > 0 ? (
                    makes.map((item: IMake) => (
                      <MenuItem key={item.MakeId} value={item.MakeId}>
                        {item.MakeName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
                <FormHelperText>Select make</FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={year ? String(year) : ''}
                  onChange={handleChangeYear}
                  displayEmpty
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select year</FormHelperText>
              </FormControl>
            </div>

            <CustomButton href={link} disabled={isDisabled} text="Next" />

            <Button onClick={onClick} variant="contained">
              Set state
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
