'use strict'

function slice(array,initialIndex,lastIndex){
    if(!(array instanceof Array)) throw new TypeError(array + ' is not an array');
    var newArray = [];
    if(initialIndex === ''){
        initialIndex = 0;
    }
    for(var i = initialIndex; i<lastIndex; i++){
        newArray[newArray.length] = array[i];
    }
    return newArray;
}


