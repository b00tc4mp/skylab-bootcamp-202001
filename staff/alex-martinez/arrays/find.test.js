var array = ['js','nodejs','reactjs'];

console.log('TEST find');

var test = find(array,callback('nodejs'));
console.log(test);

console.log('value should be a string');
console.assert(isNaN(test), 'should be a string');

console.log('value should be inside the array');
function testInsideArray(){
    for(var i=0; i<array.length; i++){
        if(array[i]===test){
            return true;
        }
    }
    return false;
}

console.assert(testInsideArray() === true,'should be inside the array');

console.log(find('string',callback('value')));
