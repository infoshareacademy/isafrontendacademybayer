import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { counter, CounterState } from './state/counter';
import { rentalOffice, VHS } from './state/rental-office';
import rentalOfficeToolkit from './state/rental-office-toolkit';
import { shopCart, Product } from './state/shop-cart';

import rootSaga from './sagas';

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
const sagaMiddleware = createSagaMiddleware()
const enhancers = composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware));

export const store = createStore(reducers, enhancers);
sagaMiddleware.run(rootSaga);