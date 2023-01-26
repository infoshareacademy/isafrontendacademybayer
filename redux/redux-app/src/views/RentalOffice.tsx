import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { State } from '../store';
import { createAddAction, createRemoveAction, createRentAction, createReturnAction } from '../state/rental-office';
import { add, rent, remove, takeBack } from '../state/rental-office-toolkit';

export const RentalOffice = () => {
    const elements = useSelector((state: State) => state.rentalOffice);
    const dispatch = useDispatch();

    const handleRemove = (id: number) => {
        // dispatch(createRemoveAction(id))
        dispatch(remove(id))
    }

    const handleRent = (id: number) => {
        // dispatch(createRentAction(id))
        dispatch(rent(id))
    }

    const handleReturn= (id: number) => {
        // dispatch(createReturnAction(id))
        dispatch(takeBack(id))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newElementName = data.get('name');
        // dispatch(createAddAction(newElementName as string))
        dispatch(add(newElementName as string))
    }

    return <>
        <h1>RentalOffice</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th style={{ width: "80px" }} />
                <th style={{ width: "50px" }} />
            </tr>
            </thead>
            <tbody>
                {
                    elements.map(element => (
                        <tr key={element.id}>
                            <td>{element.name}</td>
                            <td>
                                {
                                    element.isRented
                                        ? <Button variant="secondary" onClick={() => handleReturn(element.id)}>Return</Button>
                                        : <Button variant="primary" onClick={() => handleRent(element.id)}>Rent</Button>
                                }
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemove(element.id)}>
                                    X
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control type="text" name="name" placeholder="Enter name" />
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}