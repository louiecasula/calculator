// Variables & DOM elements
let firstOperand = secondOperand = 0;
let currentOperator = null;
const buffer = document.querySelector('.buffer');
const display = document.querySelector('.display');
display.innerHTML = firstOperand;
const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
    btn.addEventListener('click', buttonClick);
})

// Calculator functions:
function buttonClick() {
    console.log(this.innerText);
    if (isNaN(this.innerText)) {
        handleSymbol(this.innerText);
    } else {
        handleNumber(Number(this.innerText));
    }
    if (secondOperand !== 0) {
        display.innerText = secondOperand;
    }
    else {
        display.innerText = firstOperand;
    }
}

function handleNumber(num) {
    if (currentOperator === null) {
        if (firstOperand === 0 && num === 0) {
            firstOperand = 0;
        } else {
            firstOperand = Number(String(firstOperand) + num);
        }
    } else {
        if (secondOperand === 0 && num === 0) {
            secondOperand = 0;
        } else {
            secondOperand = Number(String(secondOperand) + num);
        }
    }
}

function handleSymbol(sym) {
    switch(sym) {
        case("C"):
            clearDisplay();
            break;
        case("Del"):
            removeFinalDisplayNumber();
            break;
        case("="):
            if (currentOperator !== null) {
                let answer = operate(firstOperand, currentOperator, secondOperand);
                buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
                console.log(`${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`);
                firstOperand = answer;
                secondOperand = 0;
                currentOperator = null;
            }
            break;
        case("."):
            console.log("DEC"); // TODO: Extra Credit
            break;
        default:
            if (currentOperator !== null && secondOperand !== 0) {
                buffer.innerText = `${firstOperand} ${currentOperator} ${secondOperand} = ${answer}`;
                firstOperand = operate(firstOperand, currentOperator, secondOperand);
                secondOperand = 0;
                currentOperator = null;
            }
            currentOperator = sym;
            buffer.innerText = `${firstOperand} ${currentOperator}`;
    }
}

function clearDisplay() {
    buffer.innerText = '';
    firstOperand = 0;
    secondOperand = 0;
    currentOperator = null;
}

function removeFinalDisplayNumber() {
    if (buffer.innerText.length > 0) {
        if ((-10 < secondOperand && secondOperand < 10) || isNaN(secondOperand)) {
            secondOperand = 0;
        } else { 
            let numberString = String(secondOperand);
            secondOperand = numberString.substring(0, numberString.length - 1);
        }
    }
    else {
        if ((-10 < firstOperand && firstOperand < 10) || isNaN(firstOperand)) {
            firstOperand = 0;
        } else { 
            let numberString = String(firstOperand);
            firstOperand = numberString.substring(0, numberString.length - 1);
        }
    }
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