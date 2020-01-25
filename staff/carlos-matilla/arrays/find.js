var a = [1,2,3,4,5]

function find(array, element){
    for(var i = 0; i<array.length; i++){
        if(element === array[i]) return array[i]
    }
}