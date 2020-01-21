'use strict'

console.log("TEST forEach-------------------------------------------------");

console.log("it should return the array with all changes modified by the callback");
var arr = [1, 2, 3];
forEach(arr, function(value, index){
    arr[index]=value*=10;
});

// console.assert(arr[0] === 11, 'Test value on index 0 should be 10');
console.assert(arr[1] === 20, 'it should be 20');