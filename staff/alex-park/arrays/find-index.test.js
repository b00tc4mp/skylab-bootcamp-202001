'use strict'

console.log('TEST findIndex----------------------------');
console.log('it returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1.');
// var a = [1, 5, 10, 25, 100];
// console.log('method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1: ', 
// findIndex(a, function(value){ return value > 30;}));

// var b = [1, 5, 10, 25, 100];
// console.log('method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1: ', 
// findIndex(b, function(value){ return value > 130;}));

// var c = [1, 5, 1, 1, 5];
// console.log('method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1', 
// findIndex(c, function(value){ return value === 5;}));

var a = [1, 5, 10, 25, 100];
var test = findIndex(a, function(value) {return value > 5});
console.assert(test === 2, 'it should return the index of value 10 in array a');

var b = [5, 10, 15, 20, 25];
var test2 = findIndex(b, function(value) {return value > 30});
console.assert(test2 === -1, 'it should return -1 since no value from array b meets the criteria');

var c = [5,10,15,20,20,20,20,20];
var test3 = findIndex(c, function(value) {return value === 20});
console.assert(test3 === 3, 'it should return the index of only the first element meeting the criteria');