import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VHS } from "./rental-office";

const initialState: VHS[] = [
    { id: 1, name: 'The Lion King', isRented: true },
    { id: 2, name: 'Robocop', isRented: false },
    { id: 3, name: 'Kobra', isRented: false },
    { id: 4, name: 'Pocahontas', isRented: false },
];

const rentalOfficeSlice = createSlice({
    name: 'rentalOffice',
    initialState,
    reducers: {
        add(state, action: PayloadAction<string>) {
            const newVHS = {
                name: action.payload,
                id: state.length + 1,
                isRented: false
            }
            return [...state, newVHS];
        },
        remove(state, action: PayloadAction<number>) {
            return state.filter(element => element.id !== action.payload);
        },
        rent(state, action: PayloadAction<number>) {
            state.forEach(element => {
                if (element.id === action.payload) element.isRented = true
            });
        },
        takeBack(state, action: PayloadAction<number>) {
            state.forEach(element => {
                if (element.id === action.payload) element.isRented = false
            });
        }
    }
});

export const { add, remove, rent, takeBack } = rentalOfficeSlice.actions
export default rentalOfficeSlice.reducer;