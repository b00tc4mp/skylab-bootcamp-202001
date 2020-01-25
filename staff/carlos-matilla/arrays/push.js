function push(array, ...arguments){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array')
    
    for(var i = 0; i<arguments.length;i++){
        array[array.length]= arguments[i];
    }
    return array.length;
}
