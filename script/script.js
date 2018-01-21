let buttons = document.getElementsByTagName("button");

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
        e.preventDefault();

        let screen = document.querySelector('.screen');
        var screenVal = screen.innerHTML.split(" ");
        let btnVal = this.innerHTML;
        let operators = ["+", "-", "/", "*"];
        let lastChar = screenVal[screenVal.length - 1];
        let sLastChar = screenVal[screenVal.length - 2];
        let calcInput = [];

        if (btnVal === "C") {
            screen.innerHTML = "";
        }
        else if (screenVal.indexOf("/") > -1 && screenVal.indexOf("0") === screenVal.indexOf("/") + 1) {
            screen.innerHTML = "Cannot divide by zero";
        }
        else if (btnVal === "=") {

            if (operators.indexOf(lastChar) > -1 || screenVal === "undefined" || screenVal === "NaN" || screenVal.indexOf("error") > -1 || screenVal.indexOf("Cannot divide by zero") > -1) {
                screen.innerHTML = "error";
            }
            else {
                screenVal.forEach(el => {
                    (operators.indexOf(el) === -1) ? calcInput.push(parseInt(el)) : calcInput.push(el);
                });
                screen.textContent = calculator(calcInput);
            }
        }
        else if (operators.indexOf(btnVal) > -1) {
            if (screenVal != "" && operators.indexOf(lastChar) === -1) {
                screen.innerHTML += btnVal;
            }
            else if (screenVal === "" && btnVal === "-") {
                screen.innerHTML += btnVal;
            }
            if (operators.indexOf(lastChar) > -1 && screenVal.length > 1) {
                screen.innerHTML = screenVal.replace(/.$/, btnVal);
            }
        }
        else if (operators.indexOf(sLastChar) > -1 && lastChar === "0") {
            screen.innerHTML = screenVal.replace(/.$/, btnVal);
        }
        else if (screenVal === "" && btnVal != 0 || screenVal.length > 0) {
            screen.innerHTML += btnVal;
        }
        function calculator(calculate) {

            let operation = [
                {
                    '*': (a, b) => a * b,
                    '/': (a, b) => a / b
                },
                {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b
                }];
            let calcInput = [], currOp;

            operation.forEach(operation => {
                calculate.forEach(element => {
                    if (operation[element]) {
                        currOp = operation[element];
                    } else if (currOp) {
                        calcInput[calcInput.length - 1] = currOp(calcInput[calcInput.length - 1], element);
                        currOp = "";
                    } else {
                        calcInput.push(element)
                    }
                });
                calculate = calcInput;
                calcInput = [];

            });
            return calculate[0];
        }
    });
}
