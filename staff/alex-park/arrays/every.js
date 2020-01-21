'use strict'

function every (array,a, expression) {
    var contador = 0;
    for (var i = 0; i < array.length; i++){
        expression(array[i])? contador++ : contador+=0;
    };
    contador===array.length ? contador=true : contador = false;
    return contador;
};