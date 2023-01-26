import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { 
    createIncrementAction, 
    createDecrementAction, 
    createResetAction,
    createAsyncIncrementAction,
    createAsyncDecrementAction,
    createIncrementSagaAction,
    createDecrementSagaAction
} from "../state/counter";
import { State } from "../store";

export const Counter = () => {
    const { value, isLoading } = useSelector((state: State) => state.counter);
    const dispatch = useDispatch();

    const handleIncrementClick = () => {
        dispatch(createIncrementAction())
    }

    const handleDecrementClick = () => {
        dispatch(createDecrementAction())
    }

    const handleResetClick = () => {
        dispatch(createResetAction())
    }

    const handleAsyncIncrementClick = () => {
        dispatch(createAsyncIncrementAction())
    }

    const handleAsyncDecrementClick = () => {
        dispatch(createAsyncDecrementAction())
    }

    const handleSagaIncrementClick = () => {
        dispatch(createIncrementSagaAction())
    }

    const handleSagaDecrementClick = () => {
        dispatch(createDecrementSagaAction())
    }

    return <>
        <h1>Counter</h1>
        {isLoading ? <Spinner animation="border" /> : <h2>{value}</h2>}
        <ButtonGroup>
            <Button variant="danger" onClick={handleDecrementClick}>-</Button>
            <Button variant="secondary" onClick={handleResetClick}>reset</Button>
            <Button variant="success" onClick={handleIncrementClick}>+</Button>
        </ButtonGroup>
        <ButtonGroup className="mt-3">
            <Button variant="warning" onClick={handleAsyncDecrementClick}>async -</Button>
            <Button variant="primary" onClick={handleAsyncIncrementClick}>async +</Button>
        </ButtonGroup>
        <ButtonGroup className="mt-3">
            <Button variant="secondary" onClick={handleSagaDecrementClick}>saga -</Button>
            <Button variant="info" onClick={handleSagaIncrementClick}>saga +</Button>
        </ButtonGroup>
    </>
}