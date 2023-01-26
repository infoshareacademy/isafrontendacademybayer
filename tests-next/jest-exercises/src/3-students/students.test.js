import { generateStudentReport } from './students';
import { validateStudent } from './validator';

jest.mock('./validator', () => ({
    validateStudent: jest.fn()
}))

const student = {
    name: 'John Miles',
    notes: [3, 4, 4, 5]
}

/* 
    1. should generate report
    2. should call validator function
    3. should show the validator status in report
    4. should calculate the correcnt average of notes.
*/

describe('generateStudentReport', () => {
    test('should generate report', async () => {
        const result = await generateStudentReport(student);
        expect(result).toContain("Name: John Miles")
        expect(result).toContain("Average notes: 4")
        expect(result).toContain("Has passed validation: ❌")
    });

    test('should call validator function', async () => {
        await generateStudentReport(student);
        expect(validateStudent).toHaveBeenCalled();
    });

    test('should show the validator status in report', async () => {
        validateStudent.mockReturnValue(Promise.resolve(true))
        const result = await generateStudentReport(student);

        expect(result).toContain("Has passed validation: ✅")
    });

    test('should show the validator status in report', async () => {
        const result = await generateStudentReport({ name: 'Bob', notes: [1,2,3,4]});

        expect(result).toContain("Average notes: 2.5")
    });
})
