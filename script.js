// Variables & DOM elements
let firstOperand = '0', secondOperand = '', currentOperator = null;
const buffer = document.querySelector('.buffer');
const display = document.querySelector('.display');
const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
    btn.addEventListener('click', buttonClick);
})
display.innerHTML = firstOperand;

// Calculator functions:
function buttonClick() {
    console.log(this.innerText);
    if ((isNaN(firstOperand) || firstOperand === Infinity) && firstOperand !== '0') {
        clearDisplay();
    }
    else if (isNaN(this.innerText)) {
        if (firstOperand !== '0') {
            handleSymbol(this.innerText);
        } 
    } else {
        handleNumber(this.innerText);
    }
    if (secondOperand !== '') {
        display.innerText = secondOperand;
    } else if (this.innerText === 'CLEAR') {
        display.innerText = '0';
    }
    else {
        display.innerText = firstOperand !== '0'? firstOperand: 0;
    }
}

function handleNumber(num) {
    num = Number(num);
    if (currentOperator === null) {
        if ((firstOperand === '0') && num === 0) {
            firstOperand = '0';
        } else {
            firstOperand = String(Number(firstOperand + num));
        }
    } else {
        if ((secondOperand === '0' || secondOperand === '') && num === 0) {
            secondOperand = '0';
        } else {
            secondOperand = String(Number(secondOperand + num));
        }
    }
}

function handleSymbol(sym) {
    switch(sym) {
        case("CLEAR"):
            clearDisplay();
            break;
        case("DEL"):
            removeFinalDisplayNumber();
            break;
        case("(-)"):
            makeNumberNegative();
            break;
        case("!"):
            handleFactorial();
            break;
        case("."):
            handleDecimal();
            break;
        case("="):
            handleOperation();
            break;
        default:
            handleOperation();
            currentOperator = sym;
            buffer.innerText = `${firstOperand} ${currentOperator}`;
    }
}

function handleDecimal() {
    let currentNumber = currentOperator === null? firstOperand: secondOperand;
    if (!currentNumber.includes('.')) {
        currentNumber += currentNumber.length === 0 ? '0.' : '.';
    }
    if (currentOperator === null) {
        firstOperand = currentNumber;
    } else {
        secondOperand = currentNumber;
    }
    display.innerText = currentNumber;
}

function makeNumberNegative() {
    if (currentOperator === null) {
        firstOperand = String(Number(firstOperand * -1));
    } else if (currentOperator !== null & secondOperand !== null) {
        secondOperand = String(Number(secondOperand * -1));
    }
}

function clearDisplay() {
    buffer.innerText = '';
    display.innerText = 0;
    firstOperand = '0';
    secondOperand = '';
    currentOperator = null;
}

function removeFinalDisplayNumber() {
    if (secondOperand !== '') {
        if ((Number(secondOperand) > 0 && secondOperand.length === 1) ||
        (Number(secondOperand) < 0 && secondOperand.length === 2) ||
        isNaN(secondOperand)) {
            secondOperand = '0';
            display.innerText = '0';
        } else { 
            secondOperand = secondOperand.substring(0, secondOperand.length - 1);
        }
    }
    else {
        if ((Number(firstOperand) > 0 && firstOperand.length === 1) ||
        (Number(firstOperand) < 0 && firstOperand.length === 2) ||
        isNaN(firstOperand)) {
            firstOperand = '0';
            display.innerText = '0';
        } else { 
            firstOperand = firstOperand.substring(0, firstOperand.length - 1);
        }
    }
}

function handleFactorial() {
    if (currentOperator === null) {
        let answer = factorial(firstOperand);
        buffer.innerText = `${firstOperand}! = ${answer}`;
        console.log(`${firstOperand}! = ${answer}`);
        firstOperand = String(answer);
    } else if (currentOperator !== null && secondOperand !== '') {
        let answer = operate(firstOperand, currentOperator, factorial(secondOperand));
        buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
        console.log(`${firstOperand} ${currentOperator} ${secondOperand}! = ${answer}`);
        firstOperand = String(answer);
        secondOperand = '';
        currentOperator = null;
    }
}

function factorial(num) {
    if (num === 0) { return 1; }
    if (num < 0 || num % 1 !== 0) { return NaN; }
    if (num > 170) { return Infinity; }
    let res = 1;
    for (let i = 1; i <= num; i++) {
        res *= i;
    }
    return res;
}

function handleOperation() {
    if (currentOperator !== null) {
        firstOperand = Number(firstOperand), secondOperand = Number(secondOperand);
        let answer = operate(firstOperand, currentOperator, secondOperand);
        buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
        console.log(`${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`);
        firstOperand = String(answer);
        secondOperand = '';
        currentOperator = null;
    }
}

function operate(num1, operator, num2) {
    switch(operator) {
        case("+"):
            return num1 + num2;
        case("-"):
            return num1 - num2;
        case("x"):
            return num1 * num2;
        case("÷"):
            return (num2 !== 0) ? num1 / num2: undefined;
        case("%"):
            return (num2 !== 0) ? num1 % num2: undefined;
        case("^"):
            return num1 ** num2;    
    };
};