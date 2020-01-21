    'use strict';




function filter(a,expresion){
    var newarray=[]
    for (var i=0; i<a.length; i++){
        if(expresion(a[i])){
            newarray[newarray.length]=a[i]
        }
    }
    return newarray
}
