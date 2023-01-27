import { Sign } from './Sign';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

describe('Sign', () => {
    test('should navigate to "/" when the form is submitted', () => {
        const navigateMock = jest.fn();
        useNavigate.mockImplementation(() => navigateMock);

        render(<Sign />);

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('/');
    })
})