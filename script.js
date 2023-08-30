const display = document.getElementById("display");

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    const lastChar = display.value.charAt(display.value.length - 1);
    if ((isOperator(lastChar) && isOperator(value)) || (lastChar === '.' && isOperator(value))) {
        return;
    }
    display.value += value;
}

function calculate() {
    try {
        const inputValue = display.value;
        if (isValidExpression(inputValue)) {
            const result = eval(inputValue);
            if (result === Infinity || result === -Infinity) {
                display.value = "Cannot Divide by Zero";
            } else {
                display.value = result;
            }
        } else {
            display.value = "Invalid Expression";
        }
    } catch (error) {
        display.value = "Error";
    }
}

function isValidExpression(expression) {
    const regex = /^[-+*/0-9().]+$/;
    return regex.test(expression);
}

function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}
