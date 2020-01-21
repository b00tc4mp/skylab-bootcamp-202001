'use strict'

function indexof(array, value){
    for (var i=0; i < array.length; i++){
        if(array[i] === value){
            return i
        }
    } return -1
}

var a = [1,2,3,4]
var b = 3

console.log(indexof(a,b))
