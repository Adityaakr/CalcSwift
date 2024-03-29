const display = document.getElementById("display");

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    const lastChar = display.value.slice (-1);

    if (value === "." && lastChar === ".") {
        return; // Avoid consecutive decimal points
    }

    function handleOperators(input, value) {
        // Define a function to check if a character is an operator
        function isOperator(char) {
          return char === '+' || char === '-';
        }
      
        // Check if the input is empty or value is not an operator
        if (!input || !isOperator(value)) {
          return input + value;
        }
      
        // Get the last character in the input
        const lastChar = input.charAt(input.length - 1);
      
        // Check if both the last character and the new value are operators of the same kind
        if (isOperator(lastChar) && isOperator(value) && lastChar === value) {
          return input;
        } else if (lastChar === '-' && value === '+') {
          // Replace the last character with the new value
          return input.slice(0, -1) + value;
        }
      
        return input + value;
      }
      
    if ((value === "-" || value === "+") && (lastChar === "+" || lastChar === "-")) {
        // Convert the operator
        display.value = display.value.slice(0, -1) + value;
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
 