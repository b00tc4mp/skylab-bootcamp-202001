'use strict'

console.log("TEST shift-------------------------------------");
console.log('it removes the first element from an array and returns that removed element. This method changes the length of the array.');

// var a = [1,2,3,4,5];
// console.log('it removes the first element from an array and returns that removed element. This method changes the length of the array.',
// shift(a), a);

// var b = ['a','b','c'];
// console.log('it removes the first element from an array and returns that removed element. This method changes the length of the array.',
// shift(b), b);

// var c = ['Alex', 'Aurora', 'Pepito'];
// console.log('it removes the first element from an array and returns that removed element. This method changes the length of the array.',
// shift(c), c);

var a = [1,2,3,4,5];
var test = shift(a);
console.assert(test === 1,'it should return the first element of the former array');
console.assert(a.length === 4,'original array must be modified');
console.assert(a[0] === 2,'the removed element was the first one, meaning that element on index 0 should be 2');

var b = [[1,2,3],4,5,6];
var test2 = shift(b);
console.assert(test2.__proto__.constructor.name === "Array",'shifted element type should be an array');
console.assert(b.length === 3,'original arrays length should be modified and now should be 3');