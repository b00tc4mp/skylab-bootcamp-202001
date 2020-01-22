'use strict'

console.log("TEST find-----------------------------------");
console.log('it returns the value of the first element in the provided array that satisfies the provided testing function');
// var a = [1,2,3,4];
// console.log('it returns the value of the first element in the provided array that satisfies the provided testing function',
// find(a, function(value) {return value > 2}));

// var b = ['a','b','c','d'];
// console.log('it returns the value of the first element in the provided array that satisfies the provided testing function',
// find(b, function(value) {return value > 'e'}));

// var c = [1, 'a', 'b', 2, 'c', 3];
// console.log('it returns the value of the first element in the provided array that satisfies the provided testing function',
// find(c, function(value) {return value > 2}));

var a = [1,2,3,4,5];
var test = find(a, function(value) {return value > 3});
console.assert(test === 4, 'it should return 4, the first element from array a meeting the criteria');
console.assert(a.length === 5, 'original array should not be modified.');

var b = ['a','b','c','d'];
var test2 = find(b, function(value) {return value > 'e'});
console.assert(test2 === undefined, 'it should return undefined, since no element meets the criteria');