"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import Button from "@mui/material/Button";
import CustomTable from "@/components/CustomTable";
import {ICar} from "@/types/typs";
import {CarHeader} from "@/components/CarHeader";
import CustomButton from "@/components/CustomButton";


export default function YearPage() {
    const params = useParams();
    const makeId = params.makeId as string;
    const year = params.year as string;

    const [cars, setCars] = useState<ICar[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchVehicle = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
            );

            if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

            const data = await res.json();

            if (!data.Results || data.Results.length === 0) {
                throw new Error("No data found for the selected make and year.");
            }

            setCars(data.Results);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (makeId && year) fetchVehicle();
    }, []);

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <CarHeader makeId={makeId} year={year}/>

                {error && (
                    <Alert severity="error" sx={{width: "100%"}}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <CircularProgress/>
                ) : (

                    <CustomTable data={cars}/>

                )}

                <CustomButton href={'/'} text='to the main page' />

            </main>
        </div>
    );
}
