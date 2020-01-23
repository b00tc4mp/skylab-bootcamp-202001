var array = [2, 5, [3, 2], 0, [4, 5, [7, 2]], [8, 2, 4], 9, [2, 1, 4]]

var newArr = []
// var numIndexes = 0

function flat (array, depth) { 
    if (!(array instanceof Array)) {throw new TypeError(array + ' is not an Array')}

    if (!depth) depth = 1

    function nested (element) {

        for (var j = 0; j<element.length; j++) {

            newArr[newArr.length] = element[j]
            num = element[j]

        }
    }

    for (var i = 0; i<array.length; i++) {
         
        var num = array[i]

        if (array[i] instanceof Array) {

            for (var k = 0; k<depth; k++ ) {

                    if (num instanceof Array) {nested(num)}
                }
            }
            
            else newArr[newArr.length] = array[i]
        }
      return newArr
}
    


flat(array)