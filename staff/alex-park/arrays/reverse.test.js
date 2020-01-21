'use strict'

console.log("TEST reverse-------------------------------------");
console.log("it should return a new array with the reverted values.");


var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('it should return a new array with the reverted values: ', reverse(a));

var test = reverse(a);

console.assert(test.length === a.length, 'test and the original array should have the same length');
console.assert(test[1]=== 9 , 'Should return 9');
test.forEach(function(value, index){ console.assert(value === a[a.length-index-1], 'error, numbers dont match') });

// var b = ['one', 'two', 'three', 'four', 1, 2, 3, 4];
// console.log('it should return a new array with the reverted values: ', reverse(b));

// var c = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// console.log('it should return a new array with the reverted values: ', reverse(c));