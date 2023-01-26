import { State } from "../store";
import { createSelector } from 'reselect';

export const shopCartSelector = (state: State) => state.shopCart;

export const getTotalValue = createSelector(
    shopCartSelector,
    products => products.reduce((total, product) => total + product.price, 0)
)