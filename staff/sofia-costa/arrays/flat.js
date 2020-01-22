var array1 = [2, 5, [3, 2], 0, [4, 5, 7, 2], [8, 2, 4], 9, [2, 1, 4]]
var notArray = 'hello'
var newArr = []
var numIndexes = 0

function flat (array) {
    if (!(array instanceof Array)) {throw new TypeError(array + 'is not an array')}
    for (var i = 0; i<array.length; i++) {
        if (array[i] instanceof Array) {
            
            for (var j = 0; j<array[i].length; j++) {
                
                newArr[newArr.length] = array[i][j]
                numIndexes+=1
            }
        }
        else newArr[newArr.length] = array[i]
    }
    return newArr
}

flat(array1)
flat(notArray)