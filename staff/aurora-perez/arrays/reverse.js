'use strict'

function reverse(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        newArr[newArr.length] = array[array.length - i - 1];
    }

    return newArr;
};