import { Users } from './Users';
import { render, screen, act } from '@testing-library/react';

jest.mock('./User', () => ({
    User: ({ user }) => <li>{ user.name }</li>
}))

describe('Users', () => {
    test('should display the fetched users', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([ 
                    {name: 'John'}, 
                    {name: 'Jane'} 
                ]),
            })
        );

        await act(() => {
            render(<Users />)
        });

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
    })

    test('should display empty list when fetch empty array of users', async () => {
        global.fetch = jest.fn(() => 
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );

        await act(() => {
            render(<Users />)
        });

        expect(screen.queryByRole('listitem')).toBeNull();
    })
})