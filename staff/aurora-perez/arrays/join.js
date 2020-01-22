'use strict'

function join (arr, separator) {
    if (!(arr instanceof Array)){
        throw new TypeError (arr + ' is not an Array');
    } 

    var result = '';
    for (var i = 0; i < arr.length; i++){
        if ( i == arr.length -1) {
            result += `${arr[i]}`;
        } else {
        result += `${arr[i]}`+ `${separator}`;
        };
    };
    return result;
};