import { divide } from './math';

describe('divide', () => {
    beforeEach(() => expect.hasAssertions())

    test('should return the same number when divide by 1', () => {
        const result = divide(7,1);
        expect(result).toBe(7);
    });

    test('should throw error when divide by 0', () => {
        expect(() => divide(7,0)).toThrow("Cannot divide by 0!")
    });

    test('should return the 3 when 6 divided by 2', () => {
        const result = divide(6,2);
        expect(result).toBe(3);
    });
});