// Variables & DOM elements
let firstOperand = secondOperand = '';
let currentOperator = null;
let currentNumber = currentOperator === null? firstOperand: secondOperand;
const buffer = document.querySelector('.buffer');
const display = document.querySelector('.display');
display.innerHTML = 0;
const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
    btn.addEventListener('click', buttonClick);
})

// Calculator functions:
function buttonClick() {
    console.log(this.innerText);
    if ((isNaN(firstOperand) || firstOperand == Infinity) && firstOperand !== '') {
        clearDisplay();
    }
    else if (isNaN(this.innerText)) {
        if (firstOperand !== '') {
            handleSymbol(this.innerText);
        } 
    } else {
        handleNumber(Number(this.innerText));
    }
    if (secondOperand !== '') {
        display.innerText = secondOperand;
    } else if (this.innerText === 'CLEAR') {
        display.innerText = 0;
    }
    else {
        firstOperand != ''? display.innerText = firstOperand: 0;
    }
}

function handleNumber(num) {
    if (currentOperator === null) {
        if ((firstOperand === 0 || firstOperand === '') && num === 0) {
            firstOperand = 0;
        } else {
            firstOperand = Number(String(firstOperand) + num);
        }
    } else {
        if ((secondOperand === 0 || secondOperand === '') && num === 0) {
            secondOperand = 0;
        } else {
            secondOperand = Number(String(secondOperand) + num);
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
            if (currentOperator === null && firstOperand !== null) {
                firstOperand *= -1;
            } else if (currentOperator !== null & secondOperand !== null) {
                secondOperand *= -1;
            }
            break;
        case("!"):
            if (firstOperand !== '' && currentOperator === null) {
                let answer = factorial(firstOperand);
                buffer.innerText = `${firstOperand}! = ${answer}`;
                console.log(`${firstOperand}! = ${answer}`);
                firstOperand = answer;
            } else if (currentOperator !== null && secondOperand !== '') {
                let answer = operate(firstOperand, currentOperator, factorial(secondOperand));
                buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
                console.log(`${firstOperand} ${currentOperator} ${secondOperand}! = ${answer}`);
                firstOperand = answer;
                secondOperand = '';
                currentOperator = null;
            }
            break;
        case("="):
            if (currentOperator !== null) {
                let answer = operate(firstOperand, currentOperator, secondOperand);
                buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
                console.log(`${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`);
                firstOperand = answer;
                secondOperand = '';
                currentOperator = null;
            }
            break;
        case("."):
            // if (firstOperand === 0 && !String(firstOperand).includes(".")) {
            //     firstOperand =
            // }
            break;
        default:
            if (currentOperator !== null && secondOperand !== '') {
                let answer = operate(firstOperand, currentOperator, secondOperand);
                buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
                firstOperand = answer;
                secondOperand = '';
                currentOperator = null;
            }
            currentOperator = sym;
            buffer.innerText = `${firstOperand} ${currentOperator}`;
    }
}

function clearDisplay() {
    buffer.innerText = '';
    display.innerText = 0;
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
}

function removeFinalDisplayNumber() {
    if (secondOperand != '') {
        if ((secondOperand > 0 && String(secondOperand).length === 1) ||
        (secondOperand < 0 && String(secondOperand).length === 2) ||
        isNaN(secondOperand)) {
            secondOperand = 0;
            display.innerText = 0;
        } else { 
            let numberString = String(secondOperand);
            secondOperand = numberString.substring(0, numberString.length - 1);
        }
    }
    else {
        if ((firstOperand > 0 && String(firstOperand).length === 1) ||
        (firstOperand < 0 && String(firstOperand).length === 2) ||
        isNaN(firstOperand)) {
            firstOperand = 0;
            display.innerText = 0;
        } else { 
            let numberString = String(firstOperand);
            firstOperand = numberString.substring(0, numberString.length - 1);
        }
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

function operate(num1, operator, num2) {
    if (isNaN(num1)) {
        return 0;
    }
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