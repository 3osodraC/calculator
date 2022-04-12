const bigDisplay = document.querySelector('.big-display')
    , smallDisplay = document.querySelector('.small-display')

    , clearBtn = document.querySelector('.clear-btn')
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

	// (1) Populates operator & bigDisplay with spam prevention i.e.: '+++-xxx+'.
	if(e.target.textContent.match(/[+×÷-]/) && bigDisplay.textContent != '' &&
	!bigDisplay.textContent[bigDisplay.textContent.length - 1].match(/[+×÷-]/)) {
		bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;
	}
}));

// Populates numArray, smallDisplay & operator. Also calculates.
operatorButtons.forEach(button => button.addEventListener('click', (e) => {
    operator = e.target.textContent;
    if(bigDisplay.textContent.match(/[0-9]/)) {
        numArray.push(parseInt(bigDisplay.textContent));
    }
    console.log(numArray);

    smallDisplay.textContent = bigDisplay.textContent; // This might mess up the display.
    if(numArray[numArray.length - 1] !== undefined) {
        bigDisplay.textContent = `${numArray[numArray.length - 1]}`;
    }
    newDisplay = true;

    // Calculation
	if(numArray.length > 1) {
        const index = numArray.length - 1;
		result = operate(numArray[index - 1], prevOp, numArray[index]);
        numArray.push(result);

        if(e.target.textContent === '=') {
            smallDisplay.textContent = `${numArray[index - 1] + prevOp + numArray[index]}=`;
        } else {
            smallDisplay.textContent = `${result + operator}`;
        }
        bigDisplay.textContent = `${result}`;
	}
}));

clearBtn.addEventListener('click', () => {
    operator = '';
    prevOp = '';
    result = 0;
    newDisplay = false;
    numArray = [];

    smallDisplay.textContent = '';
    bigDisplay.textContent = '';
});

// Functions
function operate(x, op, y) {
    switch (true) {
        case op === '+':
            return x + y;
        case op === '-':
            return x - y;
        case op === '×':
            return x * y;;
        case op === '÷':
            return x / y;
        default:
            return 'error';
    }
}