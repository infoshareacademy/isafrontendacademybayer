import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { counter, CounterState } from './state/counter';
import { rentalOffice, VHS } from './state/rental-office';
import rentalOfficeToolkit from './state/rental-office-toolkit';
import { shopCart, Product } from './state/shop-cart';

export type State = {
    counter: CounterState,
    rentalOffice: VHS[],
    shopCart: Product[]
}

const reducers = combineReducers({
    counter,
    rentalOffice: rentalOfficeToolkit, // change to rentalOffice for not toolkit version
    shopCart
});

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(reducers, enhancers);