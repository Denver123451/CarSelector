'use client'

import {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button';
import Link from "next/link";
import {IMake} from "@/types/typs";


export default function Home() {

    const [car, setCar] = useState('');
    const [year, setYear] = useState('');
    const [makes, setMakes] = useState<IMake[]>([]);

    const getMakes = useCallback(async () => {
        try {
            const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
            if (!res.ok) throw new Error('Failed to fetch makes');
            const data = await res.json();
            setMakes(data.Results);
        } catch (error) {
            console.error('Error fetching makes:', error);
        }
    }, []);

    useEffect( () => {
        getMakes()
    }, [])

    const years = [...Array(11).keys()].map(n => n + 2015);

    const handleChange = (event: SelectChangeEvent) => {
        setCar(event.target.value);
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };

    const isDisabled = !car || !year;
    const link = isDisabled ? "#" : `/SuccessPage/${car}/${year}`;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center ">
        <Image
          className="dark:invert"
          src="/car.webp"
          alt="car picture"
          width={300}
          height={150}
          priority
        />
        <h2 className='text-sky-500 hover:text-sky-800 '>Car Selector</h2>

          <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Make</InputLabel>
                  <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={car}
                      label="Car"
                      onChange={handleChange}
                  >
                      { makes.map(item => <MenuItem key={item.MakeId} value={item.MakeId}>{item.MakeName}</MenuItem> )}

                  </Select>
                  <FormHelperText>Select make</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                  <Select
                      id="demo-simple-select-helper"
                      value={year}
                      onChange={handleChangeYear}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                  >
                      {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}



                  </Select>
                  <FormHelperText>Select year</FormHelperText>
              </FormControl>
          </div>

          <div>
              <Link href={link} passHref>
                  <Button variant="contained" disabled={isDisabled}>Next</Button>
              </Link>


          </div>


      </main>

    </div>
  );
}
