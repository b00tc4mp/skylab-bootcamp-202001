'use strict'
var display = document.getElementsByClassName('display')[0];
var displayH = document.getElementsByClassName('displayH')[0];
var signOn = false;
var clearDisplay = true;
var historial = undefined;
var point = true;
var lastOp = "";
var lastSign = "";
var historial2 = false;

var operation = val => {
  if (historial2 && val !== ('=')) {
    displayH.innerHTML = "";
    historial2 = false;
    lastOp = "";
  }

  if (val === '+' || val === '-' || val === '*' || val === '/') {
    if (signOn) signOn = false;
    lastSign = val;
    displayH.innerHTML += display.textContent + val;
    historial = displayH.textContent.slice(0, -1);
    display.innerHTML = 0;
    clearDisplay = true;
  } else if (val === "=") { 
      if (lastOp === "") lastOp = lastSign + display.textContent;
      if (historial2 === true) {
        display.innerHTML = eval(display.textContent + lastOp);
        return point = false;
      }
      if (val === "=") {
      displayH.innerHTML += display.textContent;
      historial = displayH.textContent;
      display.innerHTML = eval(historial);
      historial2 = true;
    }
  };
  point = true;
}

var send = value => {
  if (clearDisplay) {
    display.innerHTML = "";
    clearDisplay = false;
  };
  if (!isNaN(value)) {
    display.innerHTML += parseInt(value);
    signOn = true;
  } else if (display.textContent.length > 0 && point && value === ".") {
    display.innerHTML += ".";
    point = false;
  };
}

var del = () => display.innerHTML = display.textContent.slice(0, -1);

var reset = () => location.reload();

window.addEventListener("keydown", function(event) {
  switch (event.key) {
    case "0":
     return send(0);
    case "1":
      return send(1);
    case "2":
      return send(2);
    case "3":
      return send(3);
    case "4":
      return send(4);
    case "5":
      return send(5);
    case "6":
      return send(6);
    case "7":
      return send(7);
    case "8":
      return send(8);
    case "9":
      return send(9);
    case ".":
      return send(".");
    case "+":
      return operation('+');
    case "-":
      return operation('-');
    case "*":
      return operation('*');
    case "/":
      return operation('/');
    case "Enter":
      return operation('=');
    case "Backspace":
      return del();
  }
},false);