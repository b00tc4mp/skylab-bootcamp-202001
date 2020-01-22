var lista = [3, 6, 1, 8, 0]
var newArray = []

function map (array, functionHere) {
    if (!(array instanceof Array)) throw new TypeError(arr + ' is not an Array');    
    if (typeof functionHere !== 'function') throw new TypeError(functionHere + ' is not a function');        
    
    for (var i=0; i<array.length; i++){
        newArray[newArray.length] = functionHere(array[i])
    }
    return newArray
}

map(lista, function (el) { return el * 2 })