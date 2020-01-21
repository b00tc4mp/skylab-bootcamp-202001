'use strict'

console.log("TEST includes------------------------------------------------------");
console.log('it should return whether an array includes a certain value among its entries, returning true or false as appropriate');

// var a = [1, 2, 3];
// console.log('it should return whether an array includes a certain value among its entries, returning true or false as appropriate: ',
// includes(a, 2, 1));

// var b = [10, 20, 30];
// console.log('it should return whether an array includes a certain value among its entries, returning true or false as appropriate: ',
// includes(b, 22));

// var c = [10, 20, 30];
// console.log('it should return whether an array includes a certain value among its entries, returning true or false as appropriate: ',
// includes(c, 20, -2));

var array = [1,3,5,6,7,8,9]

var test = includes(array,5, 2)

console.assert( test === true, "it should return true, since the value 5 is on index 2" )