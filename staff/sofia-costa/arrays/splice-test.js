console.log('SPLICE test')

function splice (array, start, numElements) {
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


var result1 = splice(list)
var result2 = splice(list, 2)
var result3 = splice(list, 3, 1)
var result4 = splice(list, 0, 1, 'john')
var result5 = splice(list, 2, 0, 'maria', 'joao')

var list = [1, 2, 3, 4, 5];
var start = 3;
var numDelete = 10;
var replace = 90
console.assert(typeof start === "number", 'should start value be a number')


console.log('Test 4')
var list = ['broccoli', 3, 25, true, 'i-miss-soup']
var result4 = splice(list, 0, 1, 'john')
console.assert(list[0] ===  'john', 'should print \'john\' in index 0')




var array1 = [1, 2, 3, 4, 5]
var results = [results1, results2, results3, results4, results5]

results.forEach(function(array, ) {
    console.assert('should array length be ' + array.length +  + )
})


console.log('should splice not work for undefined array')
var result = splice()
console.assert(result === TypeError: array is undefined)



console.log('should splice ')








