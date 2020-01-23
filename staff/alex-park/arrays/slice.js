'use strict'


function slice (array, begin, end=array.length){
    if (!(array instanceof Array)) {throw new TypeError(array + ' is not an array.')};
    
    var result=[];
    if (end < 0) {end = array.length + end};
    if (end === undefined) {end = array.length};

    for (var i = begin; i < end; i++){
        result[result.length] = array[i];
    }
    return result;
};