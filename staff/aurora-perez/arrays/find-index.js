'use strict'

function findIndex (arr, expression) {
    var result = -1;
    for (var i = 0; i < arr.length; i++){
        if ( expression(arr[i])){
            result = i;
            i = arr.length;
        };
    };
    return result;
};

