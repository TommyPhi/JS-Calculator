class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let answer;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                answer = prev + current;
                break;
            case '-':
                answer = prev - current;
                break;
            case '*':
                answer = prev * current;
                break;
            case '÷':
                if(this.currentOperand === '0') {
                    answer = 'ERROR: DIVIDE BY ZERO';
                } else {
                    answer = prev / current;
                }
                break;
            default:
                return;
        }
        this.currentOperand = answer;
        this.operation = undefined;
        this.previousOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    swapOperation() {
        if(this.currentOperand === '') return
        const current = parseFloat(this.currentOperand);
        this.currentOperand = current * -1;
    }

    updateOutput() {
        this.currentOperandText.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operation]');
const currentOperandText = document.querySelector('[data-current-operation]');
const swapOperationButton = document.querySelector('[data-swap-operation]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateOutput();
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateOutput();
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateOutput();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateOutput();
})

deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateOutput();
})

swapOperationButton.addEventListener('click', button => {
    calculator.swapOperation();
    calculator.updateOutput();
})

document.addEventListener('keydown', function(event) {
    if(event.key >= 0 && event.key <= 9 && event.key !== ' ') {
        calculator.appendNumber(event.key);
        calculator.updateOutput();
    }

    switch(event.key.toLowerCase()) {
        case '+':
            calculator.chooseOperation(event.key);
            calculator.updateOutput();
            break;
        case '-':
            calculator.chooseOperation(event.key);
            calculator.updateOutput();
            break;
        case '*':
            calculator.chooseOperation(event.key);
            calculator.updateOutput();
            break;
        case '/':
            calculator.chooseOperation('÷');
            calculator.updateOutput();
            break;
        case 'enter':
            calculator.compute();
            calculator.updateOutput();
            break;
        case 'backspace':
            calculator.delete();
            calculator.updateOutput();
            break;
        case '=':
            calculator.compute();
            calculator.updateOutput();
            break;
        case 'c':
            calculator.clear();
            calculator.updateOutput();
            break;
        case 'tab':
            calculator.swapOperation();
            calculator.updateOutput();
            break;
    }
})
