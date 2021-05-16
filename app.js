const display = document.querySelector(".display_text");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const percentageElem = document.querySelector(".percentage");
const ac = document.querySelector(".AC");



display.textContent = "";
let cpt = 0;
let value = 0;
let value2 = 0;
let result = 0;
let operatorSym = "";
let clickedOp = false;


numbers.forEach(number => number.addEventListener("click", handler));

function handler(){
        let bool = clickedOp;
        if(!bool){
            display.textContent = display.textContent + this.textContent;
            if(display.textContent.length == 9){
                numbers.forEach(number => number.removeEventListener("click", handler));
            }
            value = parseFloat(display.textContent);
            
        }else if(bool){
            display.textContent = display.textContent + this.textContent;
            if(display.textContent.length == 9){
                numbers.forEach(number => number.removeEventListener("click", handler));
            }
            value2 = parseFloat(display.textContent);
        }
        
}

operators.forEach(operator => operator.addEventListener("click", () => {
    clickedOp = true;
    display.textContent = "";
    operatorSym = operator.classList[operator.classList.length - 1]; 
}));


function operate(){
    switch(operatorSym){
        case "+": display.textContent = add(value, value2); break;
        case "-": display.textContent = subtract(value, value2); break;
        case "*": display.textContent = multiply(value, value2); break;
        case "/": display.textContent = divide(value, value2); break;
        case "%": display.textContent = percentage(value); break;


    }
}

function add(a, b) {
    result = a + b;
	return result;
}

function subtract(a, b) {
	result = a - b;
    return result;
}
function multiply(a, b) {
    result = a * b;
	return result;
}
function divide(a, b) {
    result = a / b;
	return result;
}
function percentage(a) {
    result = a * 0.01;
    a = result;
	return a;
}

equals.addEventListener("click", () => {
    operate();
    result = 0;
    clickedOp = false;
    value = 0;
});

ac.addEventListener("click", () => {
    result = 0;
    value = 0;
    display.textContent = "";
    clickedOp = false;
});