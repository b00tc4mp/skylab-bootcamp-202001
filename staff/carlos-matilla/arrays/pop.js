function pop(array){
    if(!(array instanceof Array)) throw new TypeError(array + ' is not an array')
    var popElement;
    popElement = array[array.length - 1];
    array.length=array.length -1;
    return popElement;
}
