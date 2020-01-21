'use strict'

function newPop(array){
    if (array.length===0)return undefined
    else 
    [array.length] = [array.length-1]
    return array    
}

var a = [1,2,3,4]
console.log(newPop(a))