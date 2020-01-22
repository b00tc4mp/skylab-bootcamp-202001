'use strict'

var nums = [0,1,2,3,4];

console.log('TEST reduce');

console.log('should return a number');

var reduceTest1 = reduce(nums,function(a,b){
    return a + b;
});

console.assert(isNaN(reduceTest1) === false, 'should be return a number');
