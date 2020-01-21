'use strict'

console.log("DEMO find-----------------------------------");

var a = [1,2,3,4];
console.log('it returns the value of the first element in the provided array that satisfies the provided testing function',
find(a, function(value) {return value > 2}));

var b = ['a','b','c','d'];
console.log('it returns the value of the first element in the provided array that satisfies the provided testing function',
find(b, function(value) {return value > 'b'}));

var c = [1, 'a', 'b', 2, 'c', 3];
console.log('it returns the value of the first element in the provided array that satisfies the provided testing function',
find(c, function(value) {return value > 2}));