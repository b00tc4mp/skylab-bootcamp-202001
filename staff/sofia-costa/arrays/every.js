var array1 = [2, 3, 4, 5, 6, 7]

function every (array, functionHere) {
    var all = 0
    for (var i = 0; i<array.length; i++) {
        if (functionHere(array[i])) all += 1
    }
    if (all = array.length) return true
    else return false
}

every (array1, function (el) {return el>1} )