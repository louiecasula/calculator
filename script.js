// Variables & DOM elements
let currentTotal = 0;
let currentOperator = null;
const display = document.querySelector('.display');
display.innerHTML = currentTotal;
const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
    btn.addEventListener('click', buttonClick);
})

function buttonClick() {
    console.log(this.innerText);
    if (isNaN(this.innerText)) {
        handleSymbol(this.innerText);
    } else {
        handleNumber(this.innerText);
    }
    display.innerText = currentTotal;
}

function handleNumber(num) {
    if (currentTotal === 0) {
        currentTotal = num;
    } else if (num !== 0) {
        currentTotal = Number(String(currentTotal) + num);
    } else {
        currentTotal = 0;
    }
}

function handleSymbol(sym) {
    switch(sym) {
        case("C"):
            currentTotal = 0;
            break;
        case("Del"):
            removeFinalDisplayNumber();
            break;
        case("="):
            currentTotal = operate(currentTotal, currentOperator, 2); // TODO: Find a way to store second operand
            break;
        case("."):
            console.log("DEC"); // TODO
            break;
        default:
            currentOperator = sym;
    }
}

function removeFinalDisplayNumber() {
    if (-10 < currentTotal && currentTotal < 10) {
        currentTotal = 0;
    } else { 
        let numberString = String(currentTotal);
        currentTotal = numberString.substring(0, numberString.length - 1);
    }
}

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
function operate(num1, operator, num2) {
    switch(operator) {
        case("+"):
            return add(num1, num2);
        case("-"):
            return subtract(num1, num2);
        case("x"):
            return multiply(num1, num2);
        case("÷"):
            return divide(num1, num2);
        case("%"):
            return modulus(num1, num2);
        case("^"):
            return exponent(num1, num2);    
    };
};