import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Burger, BurgerData } from '../../app/types';

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

export const postBurger = createAsyncThunk(
    'burgers/postBurger',
    async (burger: BurgerData, { dispatch }) => {
      await fetch('https://rest-api-b6410.firebaseio.com/burgers.json', {
        method: 'POST',
        body: JSON.stringify(burger)
      });

      dispatch(fetchBurgers())
    }
  );

export const deleteBurger = createAsyncThunk(
    'burgers/deleteBurger',
    async (burgerId: string, { dispatch }) => {
      await fetch(`https://rest-api-b6410.firebaseio.com/burgers/${burgerId}.json`, {
        method: 'DELETE',
      });

      dispatch(fetchBurgers())
    }
  );

export const putBurger = createAsyncThunk(
    'burgers/putBurger',
    async ({ id, ...rest }: Burger, { dispatch }) => {
      await fetch(`https://rest-api-b6410.firebaseio.com/burgers/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(rest)
      });

      dispatch(fetchBurgers())
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
          .addCase(postBurger.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteBurger.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(putBurger.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchBurgers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
    }
});

export default burgerSlice.reducer;