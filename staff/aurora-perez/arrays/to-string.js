'use strict'

function toString(array){
    var str='';
    for ( var i=0; i<array.length; i++){
        i === array.length-1? str += `${array[i]}` : str += `${array[i]},`;
    };
    return str
};