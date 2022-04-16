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

// Resets bigDisplay when a new number is clicked after an operator. i.e.:
// Small:    | --------> | 63+ | --------> | 63+ |
// Big  : 63 | + clicked | 63  | 3 clicked | 3   |
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    if(newDisplay) {
        bigDisplay.textContent = '';
        newDisplay = false;
    }
    prevOp = operator;
}));

// Populates bigDisplay and (1) prevents operator spam.
buttons.forEach(button => button.addEventListener('click', (e) => {
	if(e.target.textContent.match(/[0-9]/)) {
		bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;
	}

	// (1) Populates bigDisplay with spam prevention i.e.: '+++-xxx+'.
	if(e.target.textContent.match(/[+×÷-]/) && bigDisplay.textContent != '' &&
	!bigDisplay.textContent[bigDisplay.textContent.length - 1].match(/[+×÷-]/)) {
		bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;
        operator = e.target.textContent;
	}

    if(bigDisplay.textContent.length > 20) {
        bigDisplay.setAttribute('style', `font-size: 16px;`);
    } if(bigDisplay.textContent.length > 30) {
        bigDisplay.setAttribute('style', `font-size: 10px;`);
    } if(bigDisplay.textContent.length >= 50) {
        bigDisplay.textContent = bigDisplay.textContent.slice(0, -1);
    }
}));

// Populates numArray, smallDisplay & operator. Also calculates.
operatorButtons.forEach(button => button.addEventListener('click', (e) => {
    if(bigDisplay.textContent.match(/[0-9]/)) {
        numArray.push(parseInt(bigDisplay.textContent));
    }

    smallDisplay.textContent = bigDisplay.textContent; // This might mess up the display.
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
    // NOTE: I tried to the calculate part into a function but it wouldn't
    // interact with the DOM properly. This will do for now.
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