'use strict'

function find(array, expression) {
    var result;
    for (var i = 0; i < array.length; i++) {
        if (expression(array[i])) {
            result = array[i]; 
            i = array.length;
        } else {
            result = undefined;
        };
    };
    return result;
};