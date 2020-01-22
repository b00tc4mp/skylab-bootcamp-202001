'use strict'
console.log("TEST map------------------------------------------------------")
console.log("it should a new array with the applied function without modifying the original one.");

(function() {
    var a = [1,2,3];
    var resultA=map(a, function(value) {return value * 10});
    console.assert(resultA[0]===10, 'The value of index 0 should be 10');
    console.assert(resultA[1]===20, 'The value of index 1 should be 20');
    console.assert(resultA[2]===30, 'The value of index 2 should be 30');
    console.assert(resultA.length===3, 'length should be the same because this method do not modified the original array');
    
    var b= ['a', 'b', 'c'];
    var resultB = map(b, function(value) {return value += '-hello'});
    console.assert(resultB[0]==='a-hello', 'The value of index 0 should be a-hello');
    console.assert(resultB[1]==='b-hello','The value of index 1 should be b-hello');
    console.assert(resultB[2]==='c-hello','The value of index 2 should be c-hello');
    var c = ['Alex', 'Aurora', 'Pepito'];
    
    var resultC = map(c, function(value) {return `Hello, ${value}!`})
    console.assert(resultC[0]==='Hello, Alex!','The value of index 0 should be Alex');
    console.assert(resultC[1]==='Hello, Aurora!','The value of index 1 should be Aurora');
    console.assert(resultC[2]==='Hello, Pepito!','The value of index 2 should be Pepito');
})();

(function() {
    var __error;
    var a = [1,2,3];
    try {
        map(a, -1);
    } catch(error) {
        __error = error;
    } finally {
        console.assert(__error.message === "-1 is not a function", 'message should be  "-1 is not a function"');
        console.assert((__error instanceof TypeError), 'the error should be of type TypeError');
    };
})();

(function() {
    var __error;
    try {
        map('a', function(){});
    } catch(error) {
        __error = error;
    } finally {
        console.assert(__error.message === "a is not an array", 'the message should be "a is not an array"');
        console.assert((__error instanceof TypeError), 'the error should be of type TypeError');
    };
})();

