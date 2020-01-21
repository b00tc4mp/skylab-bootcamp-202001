'use strict'

function every(arr, expresion){
    for (var i=0; i < arr.length; i++){
        if(!expresion(arr[i])){
            return false
        }
    }return true
}