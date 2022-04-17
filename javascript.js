const bigDisplay = document.querySelector('.big-display')
    , smallDisplay = document.querySelector('.small-display')

    , clearBtn = document.querySelector('.clear-btn')
    , equalsBtn = document.querySelector('#equals-btn')
    , numberButtons = document.querySelectorAll('.number')
    , operatorButtons = document.querySelectorAll('.operator')
    , buttons = document.querySelectorAll('button');

let operator = ''
  , prevOp = '' // Previous operator. A work-around for erroneous calculations.
  , result
  , newDisplay = false
  , numArray = [];

// Populates bigDisplay w/ numbers, prevents overflow and (1).
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    // (1) Resets bigDisplay when a new number is clicked after an operator. i.e.:
    // Small:    | --------> | 63+ | --------> | 63+ |
    // Big  : 63 | + clicked | 63  | 3 clicked | 3   |
    if(newDisplay) {
        bigDisplay.textContent = '';
        newDisplay = false;
    }
    prevOp = operator;

    bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;

    if(bigDisplay.textContent.length > 20) {
        bigDisplay.setAttribute('style', `font-size: 16px;`);
    } if(bigDisplay.textContent.length > 30) {
        bigDisplay.setAttribute('style', `font-size: 10px;`);
    } if(bigDisplay.textContent.length >= 50) {
        bigDisplay.textContent = bigDisplay.textContent.slice(0, -1);
    }
}));

// Populates numArray, bigDisplay, smallDisplay & operator. Also calculates.
operatorButtons.forEach(button => button.addEventListener('click', (e) => {
    bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;
    operator = e.target.textContent;

    if(bigDisplay.textContent.match(/[0-9]/)) {
        numArray.push(parseInt(bigDisplay.textContent));
    }

    smallDisplay.textContent = bigDisplay.textContent;
    if(numArray[numArray.length - 1] !== undefined) {
        bigDisplay.textContent = `${numArray[numArray.length - 1]}`;
    }
    newDisplay = true;

    // Calculates
	if(numArray.length > 1 && numArray[1] != undefined) {
        const index = numArray.length - 1;
		result = operate(numArray[index - 1], prevOp, numArray[index]);
        numArray.push(result);

        smallDisplay.textContent = `${result + operator}`;
        if(result === Infinity) {
            bigDisplay.textContent = "Can't divide by zero!";
        } else {
            bigDisplay.textContent = `${result}`;
        }
	}
}));

equalsBtn.addEventListener('click', () => {
    numArray.push(parseInt(bigDisplay.textContent));
    
    // NOTE: I tried to turn the calculate part into a function but it wouldn't
    // interact with the DOM properly. This will do for now.
    if(numArray.length > 1 && numArray[1] != undefined) {
        const index = numArray.length - 1;
        result = operate(numArray[index - 1], prevOp, numArray[index]);
        numArray.push(result);
        
        smallDisplay.textContent = `${numArray[index - 1] + operator + numArray[index]}=`;
        bigDisplay.textContent = `${result}`;

        if(result === Infinity) {
            bigDisplay.textContent = "Can't divide by zero!";
        }
    }
});

// Clears all data when 'AC' is clicked.
clearBtn.addEventListener('click', () => {
    operator = '';
    prevOp = '';
    result = 0;
    newDisplay = false;
    numArray = [];

    smallDisplay.textContent = '';
    bigDisplay.textContent = '';
    bigDisplay.setAttribute('style', 'font-site: 24px;');
});

function operate(x, op, y) {
    switch (true) {
        case op === '+':
            return x + y;
        case op === '-':
            return x - y;
        case op === '×':
            return x * y;
        case op === '÷':
            return x / y;
        default:
            return 'error';
    }
}