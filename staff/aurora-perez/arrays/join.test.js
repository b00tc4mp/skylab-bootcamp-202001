'use strict'
console.log("TEST join------------------------------------------------------");

console.log('it creates and returns a new string by concatenating all of the elements in an array, separated by specified separator string. ')

var a = ['a', 'b', 'c'];
var resultA=join(a, '-');
console.assert(resultA==='a-b-c','it should return a string with - separator, except at final of the string');
console.assert(resultA.__proto__.constructor.name==="String", 'it should return a string');

var b = [1];
var resultB=join(b, '**');
console.assert(resultB==='1', 'it should return a 1 length string because the array have only one element')
console.assert(resultB.__proto__.constructor.name==="String", 'it should return a string');

var c = [1, 'a', 2, 'c', 5];
var resultC=join(c, '');
console.assert(resultC==='1a2c5', 'it should return a string whithout separator because it is an empty string')
console.assert(resultC.__proto__.constructor.name==="String", 'it should return a string');



console.log('should fail if first parameter is not an array');

var _error;
try {
    join(undefined, '');
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === 'undefined is not an Array', 'should fail with message "undefined is not an Array"');
};


try {
    join(1, '');
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === '1 is not an Array', 'should fail with message "1 is not an Array"');
};

try {
    join('hola', '');
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === 'hola is not an Array', 'should fail with message "hola is not an Array"');
};

