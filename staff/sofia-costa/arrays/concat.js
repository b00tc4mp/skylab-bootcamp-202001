var array1 = [1, 3, 5]
var array2 = [2, 4, 6]
var array3 = ['yo que se', 4, true]
var newArray = []

function concat (array, values) {
    for (var i = 0; i<arguments.length; i++) {
        for (var j = 0; j<arguments[i].length; j++) {
            newArray[newArray.length] = arguments[i][j]
        }
    }
    array = newArray
    console.log(array)
}

concat(array1, array2)