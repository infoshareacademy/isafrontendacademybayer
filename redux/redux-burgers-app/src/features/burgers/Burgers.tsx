import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { fetchBurgers, deleteBurger } from './burgerSlice';
import { AddBurger } from './AddBurger';

export const Burgers = () => {
    const dispatch = useAppDispatch();
    const burgers = useAppSelector(state => state.burgers.data);
    const isLoading = useAppSelector(state => state.burgers.isLoading);
  
    useEffect(() => {
      dispatch(fetchBurgers());
    }, [dispatch]);

    const handleRemove = (burgerId: string) => {
        dispatch(deleteBurger(burgerId))
    }
  
    return (
      <div className='d-flex flex-column align-items-center mt-3 mx-3'>
          <h1>Redux Burgers App</h1>
          <div className="position-relative w-100">
            {isLoading && 
                <div 
                    className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                > 
                    <Spinner animation="border" />
                </div>
                }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th>Ingredients</th>
                        <th>Price</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        burgers.map((burger) => (
                            <tr key={burger.id}>
                                <td>
                                    <img 
                                        src={burger.url || 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'}
                                        style={{ width: '50px', height: '50px'}}
                                        alt="burger"
                                    />
                                </td>
                                <td>{burger.name}</td>
                                <td>{burger.ingredients}</td>
                                <td>{burger.price}</td>
                                <td>
                                    <Button variant="primary">Edit</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemove(burger.id)}>Remove</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
          </div>
          <AddBurger />
      </div>
    );
}