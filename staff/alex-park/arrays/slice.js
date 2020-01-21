'use strict'

function slice (arr, begin, end){
    var result=[];
    if (end < 0) {end = arr.length + end};
    if (end === undefined) {end = arr.length};

    for (var i = begin; i < end; i++){
        result[result.length] = arr[i];
    }
    return result;
};