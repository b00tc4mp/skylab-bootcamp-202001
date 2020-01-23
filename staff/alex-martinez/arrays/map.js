'use strict'

function map(array,callback){
    if(!(array instanceof Array)) throw new TypeError(array + ' is not an array');
    if(!(callback instanceof Function)) throw new TypeError(callback + ' is not a function');
    var result = [];
    for(var i=0; i<array.length; i++){
        result[i] = callback(array[i]);
    }
    return result;
}
