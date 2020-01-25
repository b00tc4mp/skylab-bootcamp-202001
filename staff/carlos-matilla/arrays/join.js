function join(array, element){
    var cadena='';
    for(var i = 0; i<array.length; i++){
        if(i<array.length-1){
        cadena+= array[i] + element;
        } else{
            cadena+=array[i];
        }
    }
    return cadena;
}