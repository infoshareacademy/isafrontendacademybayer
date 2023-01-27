import React from 'react';
import { Game } from './Game';
import { render, screen, within, fireEvent } from '@testing-library/react';

describe('Game', () => {
    test('should have the initial points set to 0', () => {
        render(<Game />);

        // option 1
        const { getByText } = within(screen.getByTestId('score'))
        expect(getByText('0')).toBeInTheDocument();
        // option 2
        expect(screen.getByTestId('score')).toHaveTextContent('0')
    });

    test('should change points to 5 when click increase button', () => {
        render(<Game />);

        fireEvent.click(screen.getByRole('button', { name: 'increase' }));

        expect(screen.getByTestId('score')).toHaveTextContent('5')
    });

    test('should change points to -5 when click decrease button', () => {
        render(<Game />);

        fireEvent.click(screen.getByRole('button', { name: 'decrease' }));

        expect(screen.getByTestId('score')).toHaveTextContent('-5')
    });

    test('should score be red when pointw are below 0', () => {
        render(<Game />);

        fireEvent.click(screen.getByRole('button', { name: 'decrease' }));

        expect(screen.getByTestId('score')).toHaveStyle('color: red')
    });

    test('should show the name of the game passed via props', () => {
        render(<Game name="Witcher" />);

        expect(screen.getByText('Welcome to the game Witcher!')).toBeInTheDocument()
    });

    test('should show the alert with message about winning the game when the points is 50', () => {
        // mock the alert window method to check if it was called
        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
        // mock the use state to have initial value of 50 to trigger useEffect
        const setStateMock = jest.fn()
        jest.spyOn(React,'useState').mockImplementation(() => [50, setStateMock]); 

        render(<Game name="Witcher" />);

        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('Congratulations! You won the game Witcher!');
        expect(setStateMock).toHaveBeenCalledWith(0);
    })
})