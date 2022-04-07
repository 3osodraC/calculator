const display = document.querySelector('.operation-display')

    , clearBtn = document.querySelector('.clear-btn')
    , delBtn = document.querySelector('.del-btn')
    , pointBtn = document.querySelector('.point-btn')
    , equalsBtn = document.querySelector('.equals-btn')

    , numberButtons = document.querySelectorAll('.number')
    , operatorButtons = document.querySelectorAll('.operator')
    , buttons = document.querySelectorAll('button');


let operator = ''
  , result = ''
  , numArray = [];

buttons.forEach(button => button.addEventListener('click', (e) => {
	if(e.target.textContent.match(/[0-9]/)) {
		display.textContent = `${display.textContent + e.target.textContent}`;
	}

	// Disables operator spam, i.e. ++++----xxx-+.
	if(e.target.textContent.match(/[+×÷-]/) && display.textContent != '' &&
	!display.textContent[display.textContent.length - 1].match(/[+×÷-]/)) {
		display.textContent = `${display.textContent + e.target.textContent}`;
		operator = e.target.textContent;
	}
}));

operatorButtons.forEach(button => button.addEventListener('click', (e) => {
    numArray = display.textContent.split(/[-+×÷]/);
	numArray = numArray.slice(0, -1); // Removes empty item in the end of array.

	if(numArray.length > 1) {
		
	}
}));



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