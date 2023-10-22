//Calculator class that has multiple functions and takes in two arguments: Current and Previos Operand.
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    
    //Clear function, clears both previous and current operand as well as setting operation to undefined. Clears output.
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    //Append Number function, adds numbers into a string and displays in output.
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.') || this.currentOperand.toLowerCase().includes('error')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //Choose operation function, chooses the operation based on user input. Sets the operation variable to input and sets current operand to the previous and clears the current operand.
    chooseOperation(operation) {
        if (this.currentOperand === '' || this.currentOperand.toString().toLowerCase().includes('error')) return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //Compute function, evaluates the current and previous operand based on operation. Also checks if divide by zero and outputs error message.
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
                    this.previousOperand = ' ';
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
    
    //Delete function, deletes the right most character in current operand.
    delete() {
        if(this.currentOperand.toLowerCase().includes('error')) return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //Swap operation function, switches current operand to opposite value by multiplying my -1.
    swapOperation() {
        if(this.currentOperand.toLowerCase().includes('error')) return;
        if(this.currentOperand === '') return
        const current = parseFloat(this.currentOperand);
        this.currentOperand = current * -1;
    }

    //Update output function, changes what is being displayed in the output.
    updateOutput() {
        this.currentOperandText.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

//Querying all data from HTML Document and assigning them to variables.
const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operation]');
const currentOperandText = document.querySelector('[data-current-operation]');
const swapOperationButton = document.querySelector('[data-swap-operation]');

//Declaring calculator class to allow functions within class to execute when called based on mouse or keyboard input.
const calculator = new Calculator(previousOperandText, currentOperandText);

//For each statement selecting each number button and calling Append number function.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateOutput();
    })
})

//For each statement selecting specific operation button and calling Choose operation function.
operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateOutput();
    })
})

//Event listener for equals button to call the Compute function.
equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateOutput();
})

//Event listener for clear button to call the All Clear function.
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateOutput();
})

//Event listener for delete button to call the Delete function.
deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateOutput();
})

//Event listener for swap operation button to call the Swap Operations function.
swapOperationButton.addEventListener('click', button => {
    calculator.swapOperation();
    calculator.updateOutput();
})

//Event Listers for keyboard input. Different functions are called based on key pressed i.e pressing C will clear the output.
document.addEventListener('keydown', function(event) {
    //Check if key pressed is a number and uses Append number function.
    if(event.key >= 0 && event.key <= 9 && event.key !== ' ') {
        calculator.appendNumber(event.key);
        calculator.updateOutput();
    }

    //Check if key pressed is an operation or command key uses respective function.
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
