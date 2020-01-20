'use strict'

console.log("DEMO toString-------------------------------------------");

var a = [1, 2, 3, 4];
console.log("it should return a string with all array values: ", toString(a));

var b = ['Aa', 'Bb', 'Cc'];
console.log("it should return a string with all array values: ", toString(b));

var c = [1, 'Aa', 2, 'Bb', 3, 'Cc'];
console.log("it should return a string with all array values: ", toString(c));