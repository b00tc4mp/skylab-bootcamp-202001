//'use strict'
var historial = [];
console.log("Calculator of several parameters (sum, subtraction, multiply and divide) with history of operations // Ex.: calc(1,2,3);");

var calc = (...arguments) => {
  var sum = arguments[0];
  var subs = arguments[0];
  var mult = arguments[0];
  var div = arguments[0];

  for (var i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] == "number" && typeof arguments[0] == "number") {
      sum += arguments[i];
      subs -= arguments[i];
      mult *= arguments[i];
      div /= arguments[i];
    } 
    else return console.log("Only numbers.");       
  }

  historial.push("The sum is: " + sum + ", the subtraction is: " + subs + ", the multiply is: " + mult + ", the division is: " + div);
  console.log("The sum is: " + sum + ", the subtraction is: " + subs + ", the multiply is: " + mult + ", the division is: " + div);
  
  var res = confirm("Do you want to see the history and perform another operation?");
  res ? console.log(historial) : console.log("Bye");   
}