console.log('TEST flat')

var array1 = [2, 5, [3, 2], 0, [4, 5, 7, 2], [8, 2, 4], 9, [2, 1, 4]]
var notArray = 'hello'
var simpleArray = [2, 5, 0, 9]

var results = [a, b, c]

var a = notArray
var b = array1
var c = simpleArray

results.forEach(function (result) {
    if (!(flat(result) instanceof Array)) ; throw new TypeError(a) + ' is not an array'

})




var _error
try {
    flat(notArray)
}
catch(error) {
    _error = error
}
finally {
    console.assert(_error instanceof TypeError, 'should the error be of TypeError');
}



