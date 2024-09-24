const Display = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('.clear');

let firstValue = 0;
let operatorValue = '';
let nextValue = false;

function getNumberValue(number) {
    //replace currentValue if first value is entered
    if (nextValue) {
        //console.log(number);
    Display.textContent = number
    nextValue = false;    
    }else{
        //if current display value is 0, replace it, if not add number;
    const displayValue = Display.textContent;
    Display.textContent = displayValue === '0' ? number : displayValue + number;
    }
}
//console.log(inputBtns);
//adding event listener on our button(number, operator,decimal buttons)
//decimal function
function DecimAl() {
    //if no operator pressed dont add decimal
    if (nextValue) {
        return
    }
    //if no decimal add one
    if (!Display.textContent.includes('.')) {
        Display.textContent = `${Display.textContent}.`;
    }
}
//calculate used values
const calculate = {
    '/': (firstNumber,secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber,secondNumber) => firstNumber*secondNumber, 
    '+': (firstNumber,secondNumber) => firstNumber+secondNumber,
    '-': (firstNumber,secondNumber) => firstNumber-secondNumber, 
    '=': (firstNumber,secondNumber) => secondNumber,
};
function useOperator(operator) {

    const currentValue = Number(Display.textContent);
    //Prevent Multiple operator
    if (operatorValue && nextValue)
       {
        operatorValue = operator;
        return
    }
    if (!firstValue) {
        firstValue = currentValue;  
    }else{
        console.log(firstValue,operatorValue,currentValue);
        const calculation = calculate[operatorValue](firstValue,currentValue);
       // console.log('calculation',calculation);
       Display.textContent = calculation;
        firstValue = calculation;
       // console.log('calculation',calculation);
    }
    nextValue = true;
    operatorValue = operator;
    //console.log(operatorValue, firstValue);
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => getNumberValue(inputBtn.value))      
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => DecimAl());
    }
});
//reset function
function resetAll() {
    
 firstValue = 0;
 operatorValue = '';
 nextValue = false;
    Display.textContent='0'
}
//addEventListener
clearBtn.addEventListener('click', resetAll)