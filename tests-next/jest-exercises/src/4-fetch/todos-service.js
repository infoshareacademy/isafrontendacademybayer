import { postTask } from './server';

export const addTodo = async (task) => {
    if (typeof task !== 'string') {
        // test 3.
        throw "Task should be a string!"
    }

    try {
        // test 1.
        await postTask(task);

        // test 2.
        return {
            status: 'success',
            createdTask: task
        }
    } catch (e) {
        // test 4.
        return {
            status: 'error',
            message: e.message
        }
    }
};
