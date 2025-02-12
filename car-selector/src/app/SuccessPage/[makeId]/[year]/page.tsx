"use client";

import { useParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CustomTable from "@/components/CustomTable";
import { CarHeader } from "@/components/CarHeader";
import CustomButton from "@/components/CustomButton";
import { useVehicleModels } from "@/hooks/useVehicleModels";

export default function YearPage() {
    const params = useParams();
    const makeId = params.makeId as string;
    const year = params.year as string;

    const { cars, loading, error } = useVehicleModels(makeId, year);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <CarHeader makeId={makeId} year={year} />

                {error && (
                    <Alert severity="error" sx={{ width: "100%" }}>
                        {error}
                    </Alert>
                )}

                {loading ? <CircularProgress /> : <CustomTable data={cars} />}

                <CustomButton href="/" text="to the main page" />
            </main>
        </div>
    );
}
