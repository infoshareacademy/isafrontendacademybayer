import { ChangeEvent, useState } from 'react';
import { Burger } from "../../app/types"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { deleteBurger, putBurger } from './burgerSlice';
import { useAppDispatch } from "../../app/hooks";

export const BurgerRow = (props: { burger: Burger }) => {
    const { burger } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(burger);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRemove = () => {
        dispatch(deleteBurger(burger.id))
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        dispatch(putBurger(formData))
            .then(() => {
                setIsEditing(false);
            })
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    return <tr>
        <td>
            <img 
                src={burger.url || 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'}
                style={{ width: '50px', height: '50px'}}
                alt="burger"
            />
        </td>
        {
            isEditing 
                ? (
                    <>
                        <td><Form.Control type="text" name="name" onChange={handleChange} value={formData.name} /></td>
                        <td><Form.Control type="text" name="ingredients" onChange={handleChange} value={formData.ingredients} /></td>
                        <td><Form.Control type="text" name="price" onChange={handleChange} value={formData.price} /></td>
                        <td><Button variant="success" onClick={handleSave}>Save</Button></td>
                        <td><Button variant="secondary" onClick={handleCancel}>Cancel</Button></td>
                    </>
                )
                : (
                    <>
                        <td>{burger.name}</td>
                        <td>{burger.ingredients}</td>
                        <td>{burger.price}</td>
                        <td><Button variant="primary" onClick={handleEdit}>Edit</Button></td>
                        <td><Button variant="danger" onClick={handleRemove}>Remove</Button></td>
                    </>
                )
        } 
    </tr>
}