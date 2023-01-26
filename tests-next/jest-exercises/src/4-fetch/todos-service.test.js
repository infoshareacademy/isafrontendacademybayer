import { addTodo } from './todos-service';
import { postTask } from './server';

jest.mock('./server', () => ({
    postTask: jest.fn()
}))

describe('addTodo', () => {
    test('should post task', async () => {
        await addTodo('new task');
        expect(postTask).toHaveBeenCalledWith('new task');
    })

    test('should return success when post task succeed', async () => {
        const result = await addTodo('new task');
        expect(result).toEqual({ status: 'success', createdTask: 'new task'})
    })

    test('should throw an expection when task is not string', async () => {
        expect(addTodo(null)).rejects.toEqual("Task should be a string!")
    })

    test('should throw an expection when task is not string', async () => {
        postTask.mockReturnValue(Promise.reject(Error('Failed to post task')));
        const result = await addTodo('new task');

        expect(result).toEqual({ status: 'error', message: 'Failed to post task' })
    })
})