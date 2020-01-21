'use strict'

console.log("TEST push-----------------------------------------------");
console.log("it should return the array's length with the new added value");
var a = [1, 2, 3];
push(a, 4);


// var b = ['a', 'b', 'c'];
// push(b, 'd');
// console.log("it should return the array's length with the new added value", b);

// var c = [];
// push(c);
// console.log("it should return 1 and the array should have an undefined value", c);

console.assert(a.length === 4, 'should be length 4');
console.assert(a[0] === 1, 'should value at index 0 be a 1');
console.assert(a[1] === 2, 'should value at index 1 be a 2');
console.assert(a[2] === 3, 'should value at index 2 be a 3');
console.assert(a[3] === 4, 'should value at index 3 be a 4');