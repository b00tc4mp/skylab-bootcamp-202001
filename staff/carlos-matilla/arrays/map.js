

function map(array, expression){
    var newArray=[];
    for(var i = 0; i<array.length; i++){
        newArray[newArray.length] = expression(array[i])
    }
    return newArray;
}