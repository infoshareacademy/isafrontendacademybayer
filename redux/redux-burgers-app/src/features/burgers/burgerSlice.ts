import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Burger } from '../../app/types';

export type BurgersState = {
    data: Burger[],
    isLoading: boolean
}

const initialState: BurgersState = {
    data: [],
    isLoading: false
}

export const fetchBurgers = createAsyncThunk(
    'burgers/fetchBurgers',
    async () => {
      const response = await fetch('https://rest-api-b6410.firebaseio.com/burgers.json');
      const data = await response.json();
      const formattedData = Object.keys(data).map(key => ({ ...data[key], id: key }));
      return formattedData;
    }
  );

const burgerSlice = createSlice({
    name: 'burgers',
    initialState,
    reducers: {
        setBurgers: (state, action: PayloadAction<Burger[]>) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchBurgers.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchBurgers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
    }
});

export default burgerSlice.reducer;