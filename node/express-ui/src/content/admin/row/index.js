import { Link } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { http } from '../../../common/http';

export const Row = ({ burger, refresh, enterEditMode }) => {
    const handleDelete = () => {


        http.delete(`/burgers/${burger.id}`).then(() => {
            refresh();
        })
    }

    const handleEdit = () => {
        enterEditMode(burger.id)
    }

    return <TableRow>
        <TableCell>
            <Link to={`/menu/${burger.id}`}>{burger.name}</Link>
        </TableCell>
        <TableCell align="right">{burger.ingredients}</TableCell>
        <TableCell align="right">{burger.price}</TableCell>
        <TableCell>
            <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
        </TableCell>
        <TableCell>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </TableCell>
    </TableRow>
}