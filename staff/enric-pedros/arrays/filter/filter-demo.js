
console.log('DEMO filter');

var a = [1,2,3,4,5,3,6,8,9,2]
console.log('it',a)

var newArrayFilter= filter(a,function uptothree(element){
    return element > 3
})
console.log('should new array with elements HIGHER than three be return',newArrayFilter )


var ArrayFilterLesser= filter(a,function uptothree(element){
    return element === 3
})
console.log('should new array with elements EQUAL than three be return',ArrayFilterLesser )


var ArrayFilterHigher= filter(a,function uptothree(element){
    return element < 3
})
console.log('should new array with elements LESSER than three be return',ArrayFilterHigher )
