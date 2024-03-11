// Calculator functions:
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return (num2 !== 0)? num1 / num2: undefined;
}

function modulus(num1, num2) {
    return (num2 !== 0)? num1 % num2: undefined;
}

// Display:
console.log(modulus(9, -2));