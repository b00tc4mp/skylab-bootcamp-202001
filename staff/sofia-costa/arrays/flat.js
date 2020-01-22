var array1 = [2, 5, [3, 2], 0, [4, 5, 7, 2], [8, 2, 4], 9, [2, 1, 4]]
var notArray = 'hello'
var simpleArray = [2, 5, 0, 9]

var newArr = []
// var numIndexes = 0

function flat (array, depth) {
    if (!(array instanceof Array)) {throw new TypeError(array + 'is not an array')}

    for (var i = 0; i<array.length; i++) {
        if (array[i] instanceof Array) {
            // for (var i = 0; i<depth.length; i++){
                for (var j = 0; j</*element*/array[i].length; j++) {
                
                    newArr[newArr.length] = array[i][j]
                    // numIndexes+=1
                }
            // }  
        }
        else newArr[newArr.length] = array[i]
    }
    return newArr
}

flat(array1)
// flat(notArray)










// var array1 = [2, 5, [3, 2], 0, [4, 5, [7, 2]], [8, 2, 4], 9, [2, 1, 4]]
// var notArray = 'hello'
// var simpleArray = [2, 5, 0, 9]

// var newArr = []
// var numIndexes = 0

// function flat (array, depth) {
//     if (!(array instanceof Array)) {throw new TypeError(array + 'is not an array')}

//     for (var i = 0; i<array.length; i++) {
//         if (array[i] instanceof Array) {
//             function nestedArray (element) {
// 				var num = element
//                 for (var j = 0; j<element.length; j++) {
//                     newArr[newArr.length] = array[i][j]
//                     numIndexes+=1
// 				if(depth) nestedArray(num)
//                 }
//             }
//             nestedArray(array[i])
//         }
//         else newArr[newArr.length] = array[i]
//     }
//     return newArr
// }

// flat(array1, 2)