'use strict'

console.log("TEST find-----------------------------------");
console.log('it returns the value of the first element in the provided array that satisfies the provided testing function');

var a = [1,2,3,4];
var resultA=find(a, function(value) {return value > 2});
console.assert(resultA===3, 'it should return 3 because it is the first element that satisfies the condition of the collback >2');
console.assert(resultA.__proto__.constructor.name==='Number', 'it should be a number element');

var b = ['a','b','c','d'];
var resultB= find(b, function(value) {return value > 'b'});
console.assert(resultB==='c', 'it should return C because it is the first element that satisfies the condition of the collback >b');
console.assert(resultB.length===1, 'the length have to be 1 because it is only the first element');


var c = [1, 'a', 'b', 2, 'c', 3];
var resultC=find(c, function(value) {return value > 2});
console.assert(resultC===3, 'it should return 3 because it is the first element that satisfies the condition of the collback >2');
console.assert(resultC.__proto__.constructor.name==='Number', 'it should be a number element');
