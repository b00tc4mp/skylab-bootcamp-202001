'use strict'

console.log("DEMO join------------------------------------------------------");
console.log('it creates and returns a new string by concatenating all of the elements in an array, separated by specified separator string.');

// var a = ['a', 'b', 'c'];
// console.log('it creates and returns a new string by concatenating all of the elements in an array, separated by specified separator string. ',
// join(a, '-'))

// var b = [1];
// console.log ('it creates and returns a new string by concatenating all of the elements in an array, separated by specified separator string. ',
// join(b, '**'));

// var c = [1, 'a', 2, 'c', 5];
// console.log ('it creates and returns a new string by concatenating all of the elements in an array, separated by specified separator string. ',
// join(c, ''));

var a = [1,2,3];
var test = join(a, '---');
console.assert(test.length === 9, 'it should have a length of 9');
console.assert(test.__proto__.constructor.name === "String",'type of test should be a string');
console.assert(a.__proto__.constructor.name === "Array",'original array should not be modified');

var b = [1,2,3,'a','b','c'];
var test2 = join(b, '*');
console.assert(test.__proto__.constructor.name === "String",'type of test should be a string, regardless of value types on the original string');
console.assert(test2[0] === '1','it should be a string containing a 1');