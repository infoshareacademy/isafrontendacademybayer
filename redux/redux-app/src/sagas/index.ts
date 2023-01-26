import { all, put, takeEvery } from 'redux-saga/effects';
import { INCREMENT, DECREMENT, DECREMENT_ASYNC, INCREMENT_ASYNC, SET_LOADING } from '../state/counter';

const increment = function*() {
    yield put({ type: SET_LOADING });
    yield new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    yield put({ type: INCREMENT, payload: 10 })
}

function* incrementAsyncCounter() {
    yield takeEvery(INCREMENT_ASYNC, increment)
}

const decrement = function*() {
    yield put({ type: SET_LOADING });
    yield new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    yield put({ type: DECREMENT, payload: 10 })
}

function* decrementAsyncCounter() {
    yield takeEvery(DECREMENT_ASYNC, decrement)
}

export default function* rootSaga() {
    yield all([
        incrementAsyncCounter(),
        decrementAsyncCounter()
    ]);
}

