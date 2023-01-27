import { UserDetails } from './UserDetails';
import { render, screen, act } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: 1 })
}))


describe('UserDetails', () => {
    test('should show spinner when fetching data', () => {
        render(<UserDetails />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    })

    test('should call fetch method based on the url param', async () => {
        const fetchMock = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(null) }));
        global.fetch = fetchMock;

        await act(() => {
            render(<UserDetails />)
        });

        expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1')
    })

    test('should display user name when fetching data was success', async () => {
        const fetchMock = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ name: 'John Miles'}) }));
        global.fetch = fetchMock;

        await act(() => {
            render(<UserDetails />)
        });

        expect(screen.getByText('Hello John Miles!')).toBeInTheDocument();
    })

    test('should display message that user does not exists when a null was returned from fetch', async () => {
        const fetchMock = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(null) }));
        global.fetch = fetchMock;

        await act(() => {
            render(<UserDetails />)
        });

        expect(screen.getByText('Such user does not exist!')).toBeInTheDocument();
    })
});