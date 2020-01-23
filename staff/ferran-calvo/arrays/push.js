var array=[1,2,3];

function push(a, ...element){
    for (var i=0; i<element.length; i++){
        a[a.length] = element[i];
    }
    return a.length;
}

console.log(push(array, 4,5,6));
console.log(array);