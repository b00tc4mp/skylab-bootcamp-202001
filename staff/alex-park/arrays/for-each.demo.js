'use strict'

var a = [1, 2 ,3];

function forEach (array, expression) {
    for (var i = 0; i < array.length; i++) {
        expression(array[i], i);
    }
};