console.log('TEST pop---------------------------');

console.log('it should return the same array with the last value substracted')
var a = [1, 2, 3];
var resultA = pop(a);
console.assert(resultA=== a[2])

console.log("it changes length -1");
console.assert(a.length===2);

var b = [];
var resultB=pop(b);
console.log('when the array is empty, it should return undefined');
console.assert(resultB===undefined,"it should return undefined" );

var c = ['a', 'b', [1, 2, 3]];
var resultC=pop(c);
console.log('it should return the same array with the last value, other array, substracted');
console.assert(c.length===2, 'c length should be 2');
console.assert(c[0]==='a', 'should value at index 0 be a');
console.assert(c[1]==='b', 'should value at index 1 be b');

console.log('should parameter be an array');

var _error;
try {
    pop(undefined);
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === 'undefined is not an Array', 'should fail with message "undefined is not an Array"');
};


try {
    pop(1);
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === '1 is not an Array', 'should fail with message "1 is not an Array"');
};

try {
    pop('hola');
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === 'hola is not an Array', 'should fail with message "hola is not an Array"');
};

