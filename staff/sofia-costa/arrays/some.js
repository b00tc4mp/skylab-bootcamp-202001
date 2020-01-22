var array1 = [2, 10, 52, 4, 140, 6]

function some (array, functionHere) {
    for (var i = 0; i<array.length; i++){   
        if (functionHere(array[i])) return true
        else return false
    }
}

some (array1, function (el) {return el=6})