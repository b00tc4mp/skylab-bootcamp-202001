function concat(){
    var newArray = []

    for(var i = 0; i<arguments.length; i++){
        if(!(arguments[i] instanceof Array)) throw new TypeError(arguments[i] + ' is not an array')
        
        for(var j = 0; j<arguments[i].length; j++){
            newArray[newArray.length] = arguments[i][j]
        }
    }
    return newArray;
} 
  
  