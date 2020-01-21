'use strict'
console.log("TEST filter-------------------------------------------------");
console.log("it should a new array with the applied function without modifying the original one: ");

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = filter(a, function(value) {return value > 6});
console.assert(result[1] === 8, 'it should be 8');
console.assert(a[2] === 3, 'it should be 3 since the original array is not modified');



// var b = ['a','b','c','d','e'];
// console.log("it should a new array with the applied function without modifying the original one: ");
// var resultB = filter(b, function(value) {return value > 'b'});

// var c = [10, 20, 30, 40, 50];
// console.log("it should a new array with the applied function without modifying the original one: ");
// var resultC = filter(c, function(value) {return value -10});