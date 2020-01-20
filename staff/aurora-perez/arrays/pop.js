'use strict'

function pop(array) {
    if (array.length === 0) {
        array[0] = undefined;
        return array[0];
    } else {
        array.length = array.length-1;
    }
};