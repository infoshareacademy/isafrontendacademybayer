import { useState, useEffect } from 'react';
import { PageWrapper } from "../../common/page-wrapper"
import { Auth } from "../../common/auth"
import { AddModalButton } from './add-modal';
import { Row } from './row';
import { EditRow } from './edit-row';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ButtonContainer = styled.div`
    margin-top: 20px;
    align-self: flex-end;
`;

export const Admin = () => {
    const [burgers, setBurgers] = useState([]);
    const [editId, setEditId] = useState(null);

    const enterEditMode = (id) => {
        setEditId(id);
    }

    const cancelEditMode = () => {
        setEditId(null);
    }

    const fetchBurgers = async () => {
        const response = await fetch('https://rest-api-b6410.firebaseio.com/burgers.json');
        const data = await response.json();

        const formattedData = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setBurgers(formattedData);
    }

    useEffect(() => {
        fetchBurgers();
    }, []);

    return (
        <Auth>
            <PageWrapper title="Admin">
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Ingredients</TableCell>
                            <TableCell align="right">Price ($)</TableCell>
                            <TableCell sx={{ width: '65px' }} />
                            <TableCell sx={{ width: '85px' }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {burgers.map(burger => editId === burger.id 
                            ? <EditRow
                                key={burger.id}
                                burger={burger}
                                refresh={fetchBurgers}
                                cancelEditMode={cancelEditMode}
                            />
                            : <Row 
                                key={burger.id} 
                                burger={burger} 
                                refresh={fetchBurgers}
                                enterEditMode={enterEditMode}
                            />
                        )}
                    </TableBody>
                    </Table>
                </TableContainer>
                <ButtonContainer>
                    <AddModalButton refresh={fetchBurgers} />
                </ButtonContainer>
            </PageWrapper>
        </Auth>
    )
}