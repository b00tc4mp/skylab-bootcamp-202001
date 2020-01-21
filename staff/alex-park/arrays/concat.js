'use strict'

function concat (){
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        var arr = arguments[i];
        for (var j = 0; j < arr.length; j++) {
            result[result.length] = arr[j];
        };
    };
    return result;
};