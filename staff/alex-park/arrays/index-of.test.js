'use strict'

console.log("TEST indexOf-----------------------------------------------------");
console.log("it returns the index of the identified value, from certain position. If it is not in the array, it returns -1");

var a = [10,20,30,40,50,60,70];
var test = indexOf(a, 50, -2);

console.assert(test === -1, "this is garbage");