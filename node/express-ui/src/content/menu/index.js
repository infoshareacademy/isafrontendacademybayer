import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from "../../common/page-wrapper"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { http } from '../../common/http';

export const Menu = () => {
    const [burgers, setBurgers] = useState([]);

    useEffect(() => {
        http.get('/burgers')
            .then(data => {
                const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setBurgers(formattedData);
            })
    }, []);

    return <PageWrapper title="Menu">
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Ingredients</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {burgers.map(burger => (
                    <TableRow key={burger.id}>
                        <TableCell>
                            <Link to={`/menu/${burger.id}`}>{burger.name}</Link>
                        </TableCell>
                        <TableCell align="right">{burger.ingredients}</TableCell>
                        <TableCell align="right">{burger.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </PageWrapper>
}