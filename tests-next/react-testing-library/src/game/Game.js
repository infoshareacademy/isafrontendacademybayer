import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'

const Score = styled.span`
    color: ${props => props.isRed ? 'red' : 'inherit'};
`

export const Game = ({ name }) => {
    const [points, setPoints] = useState(0);

    const increase = () => {
        setPoints(points + 5);
    }

    const decrease = () => {
        setPoints(points - 5);
    }

    useEffect(() => {
        if (points === 50) {
            alert(`Congratulations! You won the game ${name}!`);
            setPoints(0);
        }
    }, [points, name]);

    return (
        <>
            <Typography variant="h5">Welcome to the game {name}!</Typography>
            <Typography variant="h4">Your number of points is: <Score data-testid="score" isRed={points < 0}>{points}</Score>.</Typography>
            <div>
                <Button aria-label="increase" variant="contained" color="primary" onClick={increase}>
                    <Icon>add</Icon>
                </Button>
                <Button aria-label="decrease" variant="contained" color="error" onClick={decrease}>
                    <Icon>remove</Icon>
                </Button>
            </div>
        </>
    )
}

// <h4>Your number of points is: <span style={{ color: points < 0 ? 'red' : 'inherit'}}>{points}</span>.</h4>
