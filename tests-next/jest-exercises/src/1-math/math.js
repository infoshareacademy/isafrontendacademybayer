export const divide = (a, b) => {
    if (b === 0) {
        throw "Cannot divide by 0!"
    }

    return a / b;
};