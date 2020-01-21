'use strict'

function slice (arr, begin, end){
    var result=[];
    if (!end){
        end = arr.length;
    }
    for (var i = begin; i< end; i++){
        result[result.length] = arr[i];
    }
    return result;
};