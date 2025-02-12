import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {ITableData} from "@/types/typs";


export default function CustomTable({data}: ITableData) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Brand</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Model_ID</TableCell>
                        <TableCell align="right">Model_Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
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
    )
};