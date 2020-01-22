var arr=[1, 2, 3];
forEach(arr, function(value, index){
    arr[index]=value+=10;
});
var results = [];
results.forEach(function(result, index){
    console.assert(result === a[index] + 10, 'should value at index'+ index+'be'+ (a[index]+ 10))
})
console.assert(arr.length === 3, 'should array length be 3');
console.assert(arr[0]===11, 'should value at index 0 be 11');
console.assert(arr[1]===12, 'should value at index 0 be 11');
console.assert(arr[2]===13, 'should value at index 0 be 11');


console.log('should parameter be an array');

var _error;
try {
    concat(undefined);
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === 'undefined is not an Array', 'should fail with message "undefined is not an Array"');
};


try {
    concat(1);
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === '1 is not an Array', 'should fail with message "1 is not an Array"');
};

try {
    concat('hola');
} catch (error){
    _error=error
} finally {
    console.assert(_error instanceof TypeError, 'should error be of TypeError');
    console.assert(_error.message === 'hola is not an Array', 'should fail with message "hola is not an Array"');
};
