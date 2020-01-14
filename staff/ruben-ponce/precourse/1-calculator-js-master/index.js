'use stict'
var results = [];

var calc = (num1, num2) => {
  if (typeof num1 == "number" && typeof num2 == "number") {
    results.push(num1 + " + " + num2 + " = " + Math.round((num1 + num2) * 1000) / 1000,
                 num1 + " - " + num2 + " = " + Math.round((num1 - num2) * 1000) / 1000,
                 num1 + " x " + num2 + " = " + Math.round((num1 * num2) * 1000) / 1000,
                 num1 + " / " + num2 + " = " + Math.round((num1 / num2) * 1000) / 1000);
  } else if (num1 == undefined && typeof num2 == "number" || num2 == undefined && typeof num1 == "number") {
    results.push("The root of " + num1 + " is: " + Math.round(Math.sqrt(num1) * 1000) / 1000);
  } else if (typeof num1 != "number" || typeof num2 != "number") {
    results.push("Only numeric characters are valid");
  }
  console.log(results);
}
console.log("Calculator of a parameter (square root), or two parameters (addition, subtraction, multiply and divide). * Returns an array with max. 3 decimals and only accept numbers.");
console.log('Insert function "calc" with 1 or 2 parameters: Ej.: calc(5); // calc(1,2);');
