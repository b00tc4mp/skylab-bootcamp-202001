function slice(array, i1, i2){
    var sliceArray =[];
    for(var i =i1; i< i2; i++ ){
        sliceArray[sliceArray.length] = array[i]
    }
    return sliceArray;
}