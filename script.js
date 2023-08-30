const display = document.getElementById("display");

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    const lastChar = display.value.charAt(display.value.length - 1);

    if (value === "." && lastChar === ".") {
        return; // Avoid consecutive decimal points
    }

    if (isOperator(lastChar) && isOperator(value)) {
        return; // Avoid consecutive operators
    }

    if ((value === "-" || value === "+") && (lastChar === "+" || lastChar === "-")) {
        // Convert 2+- to 2- or 2-- to 2+
        display.value = display.value.slice(0, -1) + value;
    } else if (value === "+" && lastChar === "-") {
        // Convert 2-+ to 2+
        display.value = display.value.slice(0, -2) + value;
    } else {
        display.value += value;
    }
}

function calculate() {
    const inputValue = display.value;

    try {
        const result = eval(inputValue);

        if (!isValidResult(result)) {
            display.value = "Invalid Result";
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Error";
    }
}

function isValidResult(result) {
    return Number.isFinite(result);
}

function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}

// Listen for keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;
    
    if (key === "Backspace") {
        deleteLast();
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key.match(/[0-9.+\-*/]/)) {
        appendToDisplay(key);
    }
});
