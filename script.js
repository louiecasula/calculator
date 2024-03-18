// Variables & DOM elements
let firstOperand = secondOperand = 0;
let currentOperator = null;
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
        handleNumber(this.innerText);
    }
    display.innerText = firstOperand;
}

function handleNumber(num) {
    if (firstOperand === 0) {
        firstOperand = num;
    } else if (num != 0) {
        firstOperand = Number(String(firstOperand) + num);
    } else {
        firstOperand = 0;
    }
}

function handleSymbol(sym) {
    switch(sym) {
        case("C"):
            firstOperand = 0;
            break;
        case("Del"):
            removeFinalDisplayNumber();
            break;
        case("="):
            firstOperand = operate(firstOperand, currentOperator, secondOperand); // TODO: Find a way to store second operand
            currentOperator = null;
            break;
        case("."):
            console.log("DEC"); // TODO: Extra Credit
            break;
        default:
            currentOperator = sym;
    }
}

function removeFinalDisplayNumber() {
    if ((-10 < firstOperand && firstOperand < 10) || isNaN(firstOperand)) {
        firstOperand = 0;
    } else { 
        let numberString = String(firstOperand);
        firstOperand = numberString.substring(0, numberString.length - 1);
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