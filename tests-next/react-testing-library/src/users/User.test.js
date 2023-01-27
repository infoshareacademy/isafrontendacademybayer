import { User } from './User';
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

const user = {
    id: 1,
    name: 'John Miles',
    company: {
        name: "Bayer"
    },
    phone: '123456789'
}

describe('User', () => {
    test('should render name of the user as a link', () => {
        render(
            <BrowserRouter>
                <User user={user} />
            </BrowserRouter>
        );

        expect(screen.getByRole('link', { name: 'John Miles' })).toBeInTheDocument();
    })

    test('should render the name of the company the user works in', () => {
        render(
            <BrowserRouter>
                <User user={user} />
            </BrowserRouter>
        );

        expect(screen.getByRole('listitem')).toHaveTextContent('works in Bayer');
    })

    test('should dispaly phone number of user', () => {
        render(
            <BrowserRouter>
                <User user={user} />
            </BrowserRouter>
        );

        expect(screen.getByRole('listitem')).toHaveTextContent('123456789');
    })

    test('should dispaly area code of phone number in itlaic if provided', () => {
        const userWithAreaCodePhone = { ...user, phone: '(48)123456789'}
        render(
            <BrowserRouter>
                <User user={userWithAreaCodePhone} />
            </BrowserRouter>
        );

        expect(screen.getByRole('listitem')).toHaveTextContent('(48)');
    })
})