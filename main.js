const EPreviousNumber = document.querySelector('.previous-number');
const EUsedOperator = document.querySelector('.used-operator');
const ECurrentNumber = document.querySelector('.current-number');
const ENumbers = document.querySelectorAll("[data-number]");
const EOperators = document.querySelectorAll(".operator");
const EDivide = document.querySelector('[data-operator]');
const ESwitchSigns = document.querySelector('#switch-signs');
const EMultiply = document.querySelector('[data-operator]');
const EBackspace = document.querySelector('#backspace');
const ESubtract = document.querySelector('[data-operator]');
const EClearNumber = document.querySelector('#clear-number');
const EPoint = document.querySelector('#point');
const EEquals = document.querySelector('#equals');
const EAdd = document.querySelector('[data-operator]');
const EClearAll = document.querySelector('#clear-all');

let previousNumber = "";
let currentNumber = "";
let usedOperator = "";

ENumbers.forEach(number => number.addEventListener("click", () => {
    if (usedOperator !== "" || previousNumber === "") {
        let clickedNumber = number.getAttribute("data-number");

        if (clickedNumber === "0") {
            if (currentNumber !== "0") {
                currentNumber += clickedNumber;
            }
        } else {
            if (currentNumber === "0") {
                currentNumber = clickedNumber;
            } else {
                currentNumber += clickedNumber;
            }
        }

        ECurrentNumber.textContent = currentNumber;
    }
}));

EOperators.forEach(operator => operator.addEventListener("click", () => {
    if (previousNumber === "" && currentNumber === "") {

    } else if (previousNumber !== "" && currentNumber === "") {
        usedOperator = operator.getAttribute("data-operator");
        EUsedOperator.textContent = operator.getAttribute("data-operator-symbol");
    } else if (previousNumber === "" && currentNumber !== "") {
        previousNumber = currentNumber;
        currentNumber = "";
        usedOperator = operator.getAttribute("data-operator");
        EPreviousNumber.textContent = previousNumber;
        ECurrentNumber.textContent = currentNumber;
        EUsedOperator.textContent = operator.getAttribute("data-operator-symbol");
    } else if (previousNumber !== "" && currentNumber !== "") {
        if (usedOperator === "divide" && Number(currentNumber) === 0) {
            alert("No dividing by zero.");
        } else {
            previousNumber = evaluate(Number(previousNumber), Number(currentNumber), usedOperator);
            currentNumber = "";
            usedOperator = operator.getAttribute("data-operator");
            EPreviousNumber.textContent = previousNumber;
            ECurrentNumber.textContent = currentNumber;
            EUsedOperator.textContent = operator.getAttribute("data-operator-symbol");
        }
    }
}))

function evaluate(previousNumber, currentNumber, operator) {
    let result = 0;

    if (operator === "add") {
        result = previousNumber + currentNumber;
    } else if (operator === "subtract") {
        result = previousNumber - currentNumber;
    } else if (operator === "multiply") {
        result = previousNumber * currentNumber;
    } else if (operator === "divide") {
        result = previousNumber / currentNumber;
    }

    result = String(result);

    // if(result.includes(".")) {
    //     let decimals = result.substring(Number(result.indexOf(".")) + 1);
    //     let NumberOfDecimals = decimals.length;

    //     let droppedDecimals = 0;
    //     while(NumberOfDecimals - droppedDecimals > 10) {
    //         result = result.slice(0, -1);
    //         droppedDecimals += 1;
    //     }

    //     let integers = result.substring(0, Number(result.indexOf(".")))
    //     let NumberOfIntegers = integers.length;

    //     let droppedIntegers = 0;
    //     while(NumberOfIntegers - droppedIntegers > 10) {
    //         result = result.slice(0, -1);
    //         droppedIntegers += 1;
    //     }

    // }

    return result;
}

EEquals.addEventListener("click", () => {
    if (previousNumber !== "" && currentNumber !== "") {
        if (usedOperator === "divide" && Number(currentNumber) === 0) {
            alert("No dividing by zero.");
        } else {
            previousNumber = evaluate(Number(previousNumber), Number(currentNumber), usedOperator);
            currentNumber = "";
            usedOperator = "";
            EPreviousNumber.textContent = previousNumber;
            ECurrentNumber.textContent = currentNumber;
            EUsedOperator.textContent = "";
        }
    }
});

ESwitchSigns.addEventListener("click", () => {
    if (currentNumber !== "") {
        currentNumber = String(currentNumber * -1);
        ECurrentNumber.textContent = currentNumber;
    }
})

EBackspace.addEventListener("click", () => {
    if (currentNumber !== "") {
        currentNumber = String(currentNumber).slice(0, -1);
        if (currentNumber === "-") {
            currentNumber = "";
        }
        ECurrentNumber.textContent = currentNumber;
    }
})

EClearNumber.addEventListener("click", () => {
    currentNumber = "";
    ECurrentNumber.textContent = currentNumber;
})

EClearAll.addEventListener("click", () => {
    previousNumber = "";
    currentNumber = "";
    usedOperator = "";
    EPreviousNumber.textContent = previousNumber;
    ECurrentNumber.textContent = currentNumber;
    EUsedOperator.textContent = "";
})

EPoint.addEventListener("click", () => {
    if (currentNumber === "") {
        currentNumber = "0.";
        ECurrentNumber.textContent = currentNumber;
    } else if (currentNumber !== "" && !String(currentNumber).includes(".")) {
        currentNumber = String(currentNumber) + ".";
        ECurrentNumber.textContent = currentNumber;
    }
})