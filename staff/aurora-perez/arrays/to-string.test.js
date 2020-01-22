'use strict'

console.log("TEST toString-----------------------");

console.log("it should return a string with all values of the array, separated by a comma.");
var a = [1, 2, 3, 4];
var resultA = toString(a);
console.assert(resultA.__proto__.constructor.name==="String", 'resultA should be a string');

var b = ['Aa', 'Bb', 'Cc'];
var resultB = toString(b);
console.assert(resultB.__proto__.constructor.name==="String", 'resultA should be a string');


var c = [1, 'aA', 2, 'Bb', 3, 'Cc'];
var resultC = toString(c);
console.assert(resultC.__proto__.constructor.name==="String", 'resultA should be a string');
