import { useState } from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { http } from '../../../common/http';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AddModal = ({ isOpen, handleClose, refresh }) => {
    const [formData, setFormData] = useState({
        name: '',
        ingredients: '',
        price: '',
        url: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = () => {

        http.post('/burgers', formData).then(() => {
            handleClose();
            refresh();
        })
    }

    const { name, ingredients, price, url } = formData;

    return (
      <Dialog onClose={handleClose} open={isOpen} fullWidth>
        <DialogTitle>Add new burger</DialogTitle>
        <DialogContent>
            <FormContainer>
                <TextField label="Name" name="name" sx={{ marginTop: '10px' }}
                    value={name} onChange={handleChange} />
                <TextField label="Ingredients" name="ingredients" sx={{ marginTop: '10px' }}
                    value={ingredients} onChange={handleChange} />
                <TextField label="Price" type="number" name="price" sx={{ marginTop: '10px' }}
                    value={price} onChange={handleChange} />
                <TextField label="Image url" name="url" sx={{ marginTop: '10px' }}
                    value={url} onChange={handleChange} />
            </FormContainer>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    );
}

export const AddModalButton = ({ refresh }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return <>
        <Fab variant="contained" color="primary" onClick={handleOpen}>
            <Icon>add</Icon>
        </Fab>
        <AddModal isOpen={isOpen} handleClose={handleClose} refresh={refresh} />
    </>
}