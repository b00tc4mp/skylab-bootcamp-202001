'use strict'

console.log("TEST forEach-------------------------------------------------");
console.log("it should return the array with all changes modified by the callback");

(function() {
    var arr = [1, 2, 3];
    forEach(arr, function(value, index){
        arr[index]=value*=10;
    });
    
    console.assert(arr[0] === 10, 'Test value on index 0 should be 10');
    console.assert(arr[1] === 20, 'it should be 20');
})();

(function() {
    var a = [1, 2, 3, 4, 5];
    var __error;

    try {
        forEach(-1, function(){});
    } catch(error) {
        __error = error;
    } finally {
        console.assert((__error instanceof TypeError),'error should be of type TypeError');
        console.assert(__error.message === '-1 is not an array', )
    }
})();