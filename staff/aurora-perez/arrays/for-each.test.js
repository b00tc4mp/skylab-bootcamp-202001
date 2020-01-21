console.log("TEST forEach---------------------------");

var arr=[1, 2, 3];
forEach(arr, function(value, index){
    arr[index]=value+=10;
});


var results = [];
results.forEach(function(result, index){
    console.assert(result === arr[index] + 10, 'should value at index'+ index+'be'+ (arr[index]+ 10))
})

console.assert(arr.length === 3, 'should array length be 3');
console.assert(arr[0]===11, 'should value at index 0 be 11');
console.assert(arr[1]===12, 'should value at index 0 be 11');
console.assert(arr[2]===13, 'should value at index 0 be 11');
