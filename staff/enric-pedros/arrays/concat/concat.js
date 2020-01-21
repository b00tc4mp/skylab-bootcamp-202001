

    function concat (){
        var newarray=[];
        for (var i=0; i<arguments.length;i++){
            for(var j=0; j<arguments[i].length;j++){

                newarray[newarray.length] = arguments[i][j]
            }
        }
        return newarray
    }
