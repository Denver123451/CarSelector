'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button';

export default function Home() {

    const [car, setCar] = useState('');
    const [year, setYear] = useState('');
    const [makes, setMakes] = useState([]);

    const getMakes = async function() {
        const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
        if (!res.ok) {
                return { notFound: true };
        }

        const data = await res.json();

        setMakes(data.Results);
    }
    useEffect( () => {
        getMakes()
    }, [])

    console.log(car, year);

    const years = [...Array(11).keys()].map(n => n + 2015);

    const handleChange = (event: SelectChangeEvent) => {
        setCar(event.target.value);
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/car.webp"
          alt="Next.js logo"
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
                      { makes.map(item => <MenuItem key={item.MakeId} value={item.MakeId}>{item.MakeName}</MenuItem> )

                      }

                      <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Select make</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
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
              <Button disabled={!car || !year} variant="contained">Contained</Button>
          </div>


      </main>

    </div>
  );
}
