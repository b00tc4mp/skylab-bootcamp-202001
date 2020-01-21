'use strict'

function includes (arr, value, position){
    var result;
    if (position){
        position < 0? position = arr.length-(position*-1) : position = position;
        arr[position]===value? result = true : result = false;
    } else {
        position = arr.length;
        for (var i = 0; i < position; i++) {
            if (arr[i] === value) {
                result = true; 
                i = arr.length;
            }  else {
                result = false;
            };
        };
    };
    return result;
};