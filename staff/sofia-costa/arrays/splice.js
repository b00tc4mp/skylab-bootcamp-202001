var list = ['broccoli', 3, 25, true, 'i-miss-soup']

function splice (array, start, numElements, replace) {
    var newArray = []
    var spliced = []

    for (var i = 0; i<start; i++) {
        newArray[i]=array[i]}
    for (var j = start; j<numElements+start; j++) {
        spliced[spliced.length]=array[j]}
    for(var h = 3; h<arguments.length; h++)
        {newArray[newArray.length] = arguments[h]}
    for (var n = start + numElements; n<array.length; n++) {
        newArray[newArray.length]=array[n]}

    array = newArray
    console.log(spliced)
}

splice(list, 2, 0, 'maria', 'joao')