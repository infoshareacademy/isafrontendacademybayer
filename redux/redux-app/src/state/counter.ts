import { Dispatch } from "redux";

// INITIAL STATE
export type CounterState = {
    value: number,
    isLoading: boolean
}

const initialState: CounterState = {
    value: 0,
    isLoading: false
};

// ACTIONS
export const INCREMENT = 'INCREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const DECREMENT = 'DECREMENT';
export const DECREMENT_ASYNC = 'DECREMENT_ASYNC';
export const RESET = 'RESET';
export const SET_LOADING = 'SET_LOADING';

type Action = {
    type: typeof INCREMENT | typeof DECREMENT | typeof RESET | typeof SET_LOADING | typeof INCREMENT_ASYNC | typeof DECREMENT_ASYNC,
    payload?: number
}

// REDUCER
export const counter = (state: CounterState = initialState, action: Action): CounterState => {
    switch(action.type) {
        case INCREMENT:
            return {
                value: state.value + (action.payload || 1),
                isLoading: false
            }
        case DECREMENT:
            return {
                value: state.value - (action.payload || 1),
                isLoading: false
            }
        case RESET:
            return {
                value: 0,
                isLoading: false
            }
        case SET_LOADING:
            return {
                value: state.value,
                isLoading: true
            }
        default:
            return state
    }
}

// ACTION CREATORS
export const createIncrementAction = (value?: number): Action => ({ type: INCREMENT, payload: value });
export const createDecrementAction = (value?: number): Action => ({ type: DECREMENT, payload: value });
export const createResetAction = (): Action => ({ type: RESET });
export const createSetLoadingAction = (): Action => ({ type: SET_LOADING });

// used for redux safa
export const createIncrementSagaAction = (): Action => ({ type: INCREMENT_ASYNC });
export const createDecrementSagaAction = (): Action => ({ type: DECREMENT_ASYNC });

// redux thunk
export const createAsyncIncrementAction = () => (dispatch: Dispatch) => {
    dispatch(createSetLoadingAction())
    setTimeout(() => {
        dispatch(createIncrementAction(5))
    }, 2000);
}
export const createAsyncDecrementAction = () => (dispatch: Dispatch) => {
    dispatch(createSetLoadingAction())
    setTimeout(() => {
        dispatch(createDecrementAction(5))
    }, 2000);
}