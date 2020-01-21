var array = [0,1,2,3]
var newArray = []
var c

function shift (array) {
    c = array[0]
    for (var i = 1; i < array.length; i++) {newArray[i-1]= array[i]}
    array = newArray
    console.log(array, c)
}