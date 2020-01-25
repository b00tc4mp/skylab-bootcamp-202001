var a = [1,2,3,4,5]

function shift(array){
var shiftElement = array[0];

for(var i=1;i<array.length;i++){
    array[i-1]=array[i]
}
array.length=array.length-1
return shiftElement;
}