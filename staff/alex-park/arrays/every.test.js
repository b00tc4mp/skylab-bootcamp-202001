'use strict'
console.log ('TEST every--------------------------------------');
console.log('it tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.');

var a = [1, 2, 3];
var test = every(a,  function(value) {return value > 0});
console.assert(test === true, 'it should return true as all elements meet the criteria');
console.assert(test.__proto__.constructor.name === "Boolean", 'it should be a boolean value');

var b = [1,5,10,15,20];
var test2 = 