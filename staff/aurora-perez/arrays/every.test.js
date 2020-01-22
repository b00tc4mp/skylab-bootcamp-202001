'use strict'
console.log ('TEST every--------------------------------------');
console.log('it tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.');

var a = [1, 2, 3];
var resultA=every(a, function(value){return value<10;});
console.assert(resultA===true, 'it should return TRUE because all the arrays elements are <10');

var b = [10, 50, 100];
var resultB=every(b, function(value){return value < 70;});
console.assert(resultB===false, 'it should return FALSE because not all elemments are <70, there is 100 in the array');

var c = ['a', 'a','a','b','a'];
var resultC=every(c, function(value){value === 'a';})
console.assert(resultC===false, 'it test should return FALSE because there are other string apart from A');



console.log('should fail if first parameter is not an array');

var _error;

try {
    every('' , expression)
} catch (error) {
    _error=error;
} finally {
    console.assert(_error instanceof TypeError, 'should error be of type TypeError');
    console.assert(_error.message )
}