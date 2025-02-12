"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import Button from "@mui/material/Button";

interface Car {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

export default function YearPage() {
    const params = useParams();
    const makeId = params.makeId as string;
    const year = params.year as string;

    const [cars, setCars] = useState<Car[]>([]);
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
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/img-2.webp"
                    alt="car picture"
                    width={300}
                    height={150}
                    priority
                />

                <div className="flex gap-8">
                    <h1>Results for:</h1>
                    <p>
                        <strong>Make ID:</strong> {makeId}
                    </p>
                    <p>
                        <strong>Year:</strong> {year}
                    </p>
                </div>

                {error && (
                    <Alert severity="error" sx={{ width: "100%" }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <CircularProgress />
                ) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell align="right">ID</TableCell>
                                    <TableCell align="right">Model_ID</TableCell>
                                    <TableCell align="right">Model_Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cars.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell>{row.Make_Name}</TableCell>
                                        <TableCell align="right">{row.Make_ID}</TableCell>
                                        <TableCell align="right">{row.Model_ID}</TableCell>
                                        <TableCell align="right">{row.Model_Name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Link href={'/'} passHref>
                    <Button variant="contained">to the main page</Button>
                </Link>
            </main>


        </div>
    );
}
