var array1 = ['me', 'gustan', 'zanahorias']
var newArray1

function join (array, separator) {
    if (separator != undefined) {
        for (var i = 0; i<array.length; i++) { newArray1+= (separator + array[i]) } }
    else { 
        for (var i = 0; i<array.length; i++) { newArray1+= array[i] } }

    console.log(newArray1)
}

join (array1, ' ')