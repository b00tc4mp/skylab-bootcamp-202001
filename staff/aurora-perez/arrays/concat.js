'use strict'

function concat (...args){
    if ( ! (args[0] instanceof Array)){
        throw new TypeError (args[0] + ' is not an Array');
    };

    var result = [];
    for (var i = 0; i < args.length; i++) {
        var arr = args[i];
        for (var j = 0; j < arr.length; j++) {
            result[result.length] = arr[j];
        };
    };

    return result;
};