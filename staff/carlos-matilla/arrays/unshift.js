var a = [1,2,3,4,5]

function unshift(array, ...arguments){
    var newArray=[];
    for(var i=0;i<array.length;i++){
        newArray[i]=array[i];
    }
    for(var i = 0; i<array.length;i++){
        array[i]=arguments[i]
    }
    for(var i = arguments.length; i<(newArray.length + arguments.length);i++){
        array[i]=newArray[i - arguments.length]
    }
    return array.length;
    }
