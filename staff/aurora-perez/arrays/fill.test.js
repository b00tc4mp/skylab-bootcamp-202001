'use strict'
console.log("TEST fill--------------------------------");
console.log('it changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.');

var a = [1,2,3,4,5,6,7,8,9,10];
var test = fill(a, 'x', 4, 9);
console.assert(test[4] === 'x','it should be an x');
console.assert(test[4] === a[4], 'original array has been modified too');
console.assert(test[test.length-1] === 10,'last value should not be modified');

var b = [1,2,3,4,5,6,7,8,9,10];
var test2 = fill(b, 'x', 3);
console.assert(test2[test2.length-1] === test2[3], 'since no end was specified, all values from the start should be modified');

var c = [1,2,3,4,5,6,7,8,9,10];
var test3 = fill(c, 'oso');
var contador = 0;
test3.forEach(function(value){if(value === 'oso') {contador++}});
console.assert(contador === c.length, 'should be the same as length of original array since all values were modified');

