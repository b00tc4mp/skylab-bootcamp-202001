'use strict'
console.log("DEMO includes------------------------------------------------------");
console.log('it should return whether an array includes a certain value among its entries, returning true or false as appropriate');
var array = [1,3,5,6,7,8,9]
var test = includes(array,5, 2)
console.assert( test === true, "It should  be there 5" )
