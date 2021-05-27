const display = document.querySelector(".display_text");
const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const percent = document.querySelector(".percentage");
const decimal = document.querySelector(".decimal");
const negate = document.querySelector(".negation");
const clear = document.querySelector(".AC");
let computedFontSize = window.getComputedStyle
                        (document.querySelector(".display_text")).fontSize;



let firstNum;
let operator = "";
let displayValue = "";
let waitingForSecondNum = false;
let inputValue;
let nextOperator = "";



decimal.addEventListener("click", () => {

    if(waitingForSecondNum){
        displayValue = "0.";
        updateDisplay();
        waitingForSecondNum = false;
        return;
    }

    if(!displayValue.includes(".")){
        displayValue += ".";
        updateDisplay();
    }
});


percent.addEventListener("click", () => {

    const result = parseFloat(displayValue) * 0.01;
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstNum = result;
    updateDisplay();


});

negate.addEventListener("click", () => {

    const result = parseFloat(displayValue) * -1;
    displayValue = String(result);
    firstNum = result;
    updateDisplay();


});



function updateDisplay(){
    const display = document.querySelector(".display_text");
    display.textContent = displayValue;
}


numberKeys.forEach(numberKey => numberKey.addEventListener("click", inputHandler));

function inputHandler(){

    if(display.textContent == "0"){
        display.textContent = this.textContent;

    }else{
        if(waitingForSecondNum == true){
            display.textContent = "";
            waitingForSecondNum = false;
        }
    
        display.textContent += this.textContent;
    
        if(display.textContent.length == 9){
            numberKeys.forEach(numberKey => numberKey.removeEventListener("click", handler));
        }
    }

    
    displayValue = display.textContent;

}



operatorKeys.forEach(operatorKey => operatorKey.addEventListener("click", () => {


    waitingForSecondNum = true;

    nextOperator = operatorKey.classList[operatorKey.classList.length - 1]; 
    inputValue = parseFloat(displayValue);

    
    if((firstNum == undefined) && (!isNaN(inputValue))){
        firstNum = inputValue;

    } else if(operator){
        const result = calculate(firstNum, inputValue, operator);

        if(computedFontSize == "45px"){
            displayValue = `${parseFloat(result.toFixed(3))}`;
        }else if(computedFontSize != "45px"){
            displayValue = `${parseFloat(result.toFixed(5))}`;
        }
        firstNum = result;
        updateDisplay();
    }

    operator = nextOperator;


}));


function calculate(firstOperand, secondOperand, thisOp){
    if (thisOp === '+') {
        return firstOperand + secondOperand;
      } else if (thisOp === '-') {
        return firstOperand - secondOperand;
      } else if (thisOp === '*') {
        return firstOperand * secondOperand;
      } else if (thisOp === '/') {
        return firstOperand / secondOperand;
      } 
    
      return secondOperand;
}

clear.addEventListener("click", () => {

    display.textContent = "0";
    displayValue = "";
    firstNum = undefined;
    operator = "";
    waitingForSecondNum = false;
    inputValue = undefined;
    nextOperator = "";



});



