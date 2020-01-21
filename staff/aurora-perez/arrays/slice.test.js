'use strict'

console.log('DEMO slice---------------------------');
console.log('it should returns a shallow copy of a portion of an array into a new array from begin index to end index (end not included) without modified the original array.');
var a = [1, 2, 3, 4, 5];
var resultA = slice(a, 2);
console.assert(resultA[1] === 4, 'it should return 4, since result have sliced from index 2 on array a to beyond.');
console.assert(a.length===5,'the original array should not be modified');
var b = [1, 2, 3, 'a', 'b', 'c'];
var resultB = slice(b, 1, -3);
console.assert(resultB.length === 2, 'it should have a length of 2');
console.assert(resultB[1] === 3, 'it should be 3, since it is the last sliced value from b');

// console.log('it should returns a shallow copy of a portion of an array into a new array from begin index to end index (end not included) without modified the original array.',slice(b, 2, 4))

// var c = [1, 2, 3, 'a', 'b', 'c'];
// console.log('it should returns a shallow copy of a portion of an array into a new array from begin index to end index (end not included) without modified the original array.',slice(c, 1))