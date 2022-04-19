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
  , opErrorCheck = false
  , eqlErrorCheck = false
  , numArray = [];

// Populates bigDisplay w/ numbers and (1).
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    // (1) Resets bigDisplay when a new number is clicked after an operator. i.e.:
    // Small:    | --------> | 63+ | --------> | 63+ |
    // Big  : 63 | + clicked | 63  | 3 clicked | 3   |
    if(newDisplay) {
        bigDisplay.textContent = '';
        newDisplay = false;
    }
    prevOp = operator;
    opErrorCheck = false;

    bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;
}));

// Populates numArray, bigDisplay, smallDisplay & operator. Also calculates.
operatorButtons.forEach(button => button.addEventListener('click', (e) => {
    bigDisplay.textContent = `${bigDisplay.textContent + e.target.textContent}`;
    operator = e.target.textContent;

    if(bigDisplay.textContent.match(/[0-9]/) && !eqlErrorCheck) {
        numArray.push(parseInt(bigDisplay.textContent));
    }

    smallDisplay.textContent = bigDisplay.textContent;
    if(numArray[numArray.length - 1] !== undefined) {
        bigDisplay.textContent = `${numArray[numArray.length - 1]}`;
    }
    newDisplay = true;

    // Calculates. '&& !opErrorCheck' prevents an error, see the comment below.
	if(numArray.length > 1 && numArray[1] != undefined && !opErrorCheck && !eqlErrorCheck) {
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

    eqlErrorCheck = false;

    // Prevents error when you change the operator before clicking another number.
    // It resets to false when you click a number (numberButtons.forEach).
    opErrorCheck = true;
}));

equalsBtn.addEventListener('click', () => {
    if(operator != '') {
        numArray.push(parseInt(bigDisplay.textContent));
    }

    // NOTE: I tried to turn the calculate part into a function but it wouldn't
    // interact with the DOM properly. This will do for now.
    if(numArray.length > 1 && numArray[1] != undefined) {
        const index = numArray.length - 1;
        result = operate(numArray[index - 1], operator, numArray[index]);
        numArray.push(result);
        
        smallDisplay.textContent = 
        `${numArray[index - 1] + operator + numArray[index]}=`;
        
        bigDisplay.textContent = `${result}`;

        if(result === Infinity) {
            bigDisplay.textContent = "Can't divide by zero!";
        }
    }

    // Prevents calculation when you press an operator right after '='.
    eqlErrorCheck = true;
});

// Clears all data when 'AC' is clicked.
clearBtn.addEventListener('click', () => {
    operator = '';
    prevOp = '';
    result = 0;
    newDisplay = false;
    opErrorCheck = false;
    eqlErrorCheck = false;
    numArray = [];

    smallDisplay.textContent = '';
    bigDisplay.textContent = '';
    bigDisplay.setAttribute('style', 'font-site: 24px;');
});

// Prevents big & small display overflow.
buttons.forEach(button => button.addEventListener('click', () => {
    if(bigDisplay.textContent.length >= 20) {
        bigDisplay.setAttribute('style', 'font-size: 16px;');
    } if(bigDisplay.textContent.length >= 30) {
        bigDisplay.setAttribute('style', 'font-size: 10px;');
    } if(bigDisplay.textContent.length >= 50) {
        bigDisplay.textContent = bigDisplay.textContent.slice(0, -1);
    } if(smallDisplay.textContent.length >= 30) {
        smallDisplay.setAttribute('style', 'font-size: 14px');
    }
}));

// Debug
buttons.forEach(button => button.addEventListener('click', () => {
    console.log(
        operator,
        prevOp,
        result,
        newDisplay,
        numArray,
    );
}));

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