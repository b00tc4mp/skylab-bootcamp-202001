'use strict'

function map(arr, expresion){
    var newarray = []
    for (var i=0; i < arr.length; i++){
        if(expresion(a[i])){
            newarray[newarray.length] = expresion(a[i])
        }
    }
    return newarray
}


