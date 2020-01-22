'use strict'

console.log("TEST indexOf-----------------------------------------------------");
console.log("it returns the index of the identified value, from certain position. If it is not in the array, it returns -1");

var a = [10,20,30,40,50,60,70];
var test = indexOf(a, 50, -2);

console.assert(test === -1, "this is garbage");


var b = [10,20,30,40,50,60,70];
var test2 = indexOf(b, 30, 1);
console.assert(test2 === 2, 'it should be 2');

var c = [10,20,30,40,50,60,70];
var test3 = indexOf(c, 20);
console.assert(test3 === 1, "it should be 1, since 20 is the first element of c meeting the criteria");