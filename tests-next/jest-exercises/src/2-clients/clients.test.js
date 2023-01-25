// Wrote tests for filterClients and getLatestRegisteredClient

import { filterClients, getTotalValue } from './clients';

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

    })

    test('should return EXTERNAL clients only when filter type is EXTERNAL', () => {

    })

    test('should return all clients only when filter type is not specified', () => {

    })

    test('should return all clients only when filter type is not INTERNAL neither EXTERNAL', () => {

    })

});

describe('getTotalValue', () => {
    beforeEach(() => expect.hasAssertions())

    test('should return sum of orders', () => {

    })

    test('should return sum of orders with 10% discount if client is INTERNAL', () => {

    })
});

describe('getTotalValues', () => {
    beforeEach(() => expect.hasAssertions())

    test('should return sum of orders of all clients', () => {

    })
});

