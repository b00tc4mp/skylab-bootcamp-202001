'use strict'

console.log("DEMO forEach-------------------------------------------------");

var a = [1, 2, 3];

forEach(a, function(value, index) {
    a[index] = value + 10;
});

console.log("it should return the same array with added values", a);

var b = ['a','b','c'];

forEach(b, function(value, index) {
    b[index] = value + b[index].toUpperCase();
});

console.log("it should return the same array but with added capital letters", b);

var c = [1, 2, 3];

forEach(c, function(value, index) {
    c[index] = [c[index], c[index], c[index]];
})

console.log("it should return the same array with new arrays inside", c);