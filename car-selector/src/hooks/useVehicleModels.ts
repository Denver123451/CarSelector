import {useState, useEffect} from "react";
import {ICar} from "@/types/typs";

export function useVehicleModels(makeId: string, year: string) {
    const [cars, setCars] = useState<ICar[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!makeId || !year) return;

        const fetchVehicle = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
                );

                if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

                const data = await res.json();

                if (!data.Results || data.Count === 0) {
                    throw new Error("No data found for the selected make and year.");
                }

                setCars(data.Results);
            } catch (error) {

                setError(error instanceof Error ? error.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [makeId, year]);

    return {cars, loading, error};
}
