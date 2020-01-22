'use strict'

function reverse(array) {
    if ((array instanceof Array) === false) {throw new TypeError('reverse(' + array + ') is not a function.')}

    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        newArr[newArr.length] = array[array.length - i - 1];
    }
    return newArr;
};

