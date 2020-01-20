'use strict'
function map(array, expression) { 
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result[i] = expression(array[i]);
    }
    return result;
};