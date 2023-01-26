import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import { fetchBurgers } from './burgerSlice';
import { AddBurger } from './AddBurger';
import { BurgerRow } from './BurgerRow';

export const Burgers = () => {
    const dispatch = useAppDispatch();
    const burgers = useAppSelector(state => state.burgers.data);
    const isLoading = useAppSelector(state => state.burgers.isLoading);
  
    useEffect(() => {
      dispatch(fetchBurgers());
    }, [dispatch]);
  
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
                            <BurgerRow key={burger.id} burger={burger} />
                        ))
                    }
                </tbody>
            </Table>
          </div>
          <AddBurger />
      </div>
    );
}