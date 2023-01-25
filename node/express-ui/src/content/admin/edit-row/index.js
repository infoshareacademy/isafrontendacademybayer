import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { http } from '../../../common/http';

export const EditRow = ({ burger, cancelEditMode, refresh }) => {
    const [formData, setFormData] = useState(burger);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {

        http.put(`/burgers/${burger.id}`, formData).then(() => {
            cancelEditMode();
            refresh();
        })
    }

    const { name, ingredients, price } = formData;

    return <TableRow>
        <TableCell>
            <TextField fullWidth size="small" label="Name" name="name"
                value={name} onChange={handleChange} />
        </TableCell>
        <TableCell>
            <TextField fullWidth size="small" label="Ingredients" name="ingredients"
                value={ingredients} onChange={handleChange} />
        </TableCell>
        <TableCell>
            <TextField fullWidth size="small" label="Price" name="price" type="number"
                value={price} onChange={handleChange} />
        </TableCell>
        <TableCell>
            <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
        </TableCell>
        <TableCell>
            <Button variant="contained" color="inherit" onClick={cancelEditMode}>Cancel</Button>
        </TableCell>
    </TableRow>
}
