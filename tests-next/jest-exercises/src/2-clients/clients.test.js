// Wrote tests for filterClients and getLatestRegisteredClient

import { filterClients, getTotalValue, getTotalValues } from './clients';

const clients = [
    { id: 1, name: 'Jan', type: 'INTERNAL', orders: [100, 200] },
    { id: 2, name: 'Janina', type: 'EXTERNAL', orders: [100, 200, 200] },
    { id: 3, name: 'Max', type: 'INTERNAL',orders: [100, 200, 300] },
    { id: 4, name: 'Jennifer', type: 'EXTERNAL', orders: [1000, 200] },
    { id: 5, name: 'Bryan', type: 'EXTERNAL', orders: [10] },
]

describe('filterClients', () => {
    beforeEach(() => expect.hasAssertions())

    test('should return INTERNAL clients only when filter type is INTERNAL', () => {
        const result = filterClients(clients, {type: 'INTERNAL'});
        expect(result).toEqual([
            { id: 1, name: 'Jan', type: 'INTERNAL', orders: [100, 200] },
            { id: 3, name: 'Max', type: 'INTERNAL',orders: [100, 200, 300] },
        ])
    })

    test('should return EXTERNAL clients only when filter type is EXTERNAL', () => {
        const result = filterClients(clients, {type: 'EXTERNAL'});
        expect(result).toEqual([
            { id: 2, name: 'Janina', type: 'EXTERNAL', orders: [100, 200, 200] },
            { id: 4, name: 'Jennifer', type: 'EXTERNAL', orders: [1000, 200] },
            { id: 5, name: 'Bryan', type: 'EXTERNAL', orders: [10] },
        ])
    })

    test('should return all clients only when filter type is not specified', () => {
        const result = filterClients(clients, { type: undefined });
        expect(result).toEqual(clients)
    })

    test('should return all clients only when filter type is not INTERNAL neither EXTERNAL', () => {
        const result = filterClients(clients, { type: 'UNKNOWN'});
        expect(result).toEqual(clients)
    })

});

describe('getTotalValue', () => {
    beforeEach(() => expect.hasAssertions())

    test('should return sum of orders', () => {
        const result = getTotalValue(clients[1]);
        expect(result).toEqual(500);
    })

    test('should return sum of orders with 10% discount if client is INTERNAL', () => {
        const result = getTotalValue(clients[0]);
        expect(result).toEqual(270);
    })
});

describe('getTotalValues', () => {
    beforeEach(() => expect.hasAssertions())

    test('should return sum of orders of all clients', () => {
        const result = getTotalValues(clients);
        expect(result).toEqual(2520);
    })
});

