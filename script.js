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

    updateOutput() {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operation]');
const currentOperandText = document.querySelector('[data-current-operation]');

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