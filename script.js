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

function exponent(num1, num2) {
    return num1 ** num2;
}

// Current operation:
let num1 = 6;
let operator = "%";
let num2 = 2;

function operate(num1, operator, num2) {
    switch(operator) {
        case("+"):
            return add(num1, num2);
        case("-"):
            return subtract(num1, num2);
        case("*"):
            return multiply(num1, num2);
        case("/"):
            return divide(num1, num2);
        case("%"):
            return modulus(num1, num2);
        case("^"):
            return exponent(num1, num2);    
    };
};


// Display:
console.log(num1 + " " + operator + " " + num2 + " = " + operate(num1, operator, num2));