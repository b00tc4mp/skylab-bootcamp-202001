  
'use strict';

function Murray() {
    var _arguments = arguments;

    var initializeWithLength = (function () {
        if (_arguments.length === 1 && typeof _arguments[0] === 'number')
            if (Number.isInteger(_arguments[0]))
                return true;
            else throw new RangeError('Invalid murray length')

        return false;
    })();

    this.length = initializeWithLength ? arguments[0] : arguments.length;

    if (!initializeWithLength)
        for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
}


Murray.prototype.push = function(){
    if(!(this instanceof Murray)) throw new TypeError(this + ' should be a murray')
    
    for(var i = 0; i<arguments.length;i++){
        this[this.length]= arguments[i];
        this.length=this.length+1;
    }
    return this.length;
    
}


var murray = new Murray;
var murray2 = new Murray;

for(var i =1; i < 10;i++) murray.push(i);
for(var i =9; i > 0;i--) murray2.push(i);



Murray.prototype.forEach = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};

Murray.prototype.concat=function(){
    var newMurray = new Murray;
    for(var i=0; i < this.length;i++) newMurray.push(this[i])
    for(var i = 0; i<arguments.length; i++){
        for(var j = 0; j<arguments[i].length; j++){
            newMurray.push(arguments[i][j])
        }
    }
    return newMurray;
} 
  
  
  
Murray.prototype.find=function(element){
    for(var i = 0; i<this.length; i++){
        if(element === this[i]) return this[i]
    }
}

Murray.prototype.join=function(element){
    var cadena='';
    for(var i = 0; i<this.length; i++){
       
        if(i<this.length-1){
            if(element===undefined){cadena+= this[i] + ',';
            }else{
                cadena+= this[i] + element;
            }
        } else{
            cadena+=this[i];
        }
    }
    return cadena;
}

Murray.prototype.map=function(f){
    var newMurray=new Murray;
    for(var i = 0; i<this.length; i++){
        newMurray.push(f(this[i]))
    }
    return newMurray;
    //no funciona bien del todo
}

Murray.prototype.pop=function(){
    if(!(this instanceof Murray)) throw new TypeError(this + ' is not a Murray')
    var popElement;
    popElement = this[this.length - 1];
    delete this[this.length - 1];
    this.length=this.length -1;
    return popElement;
}

Murray.prototype.shift=function(){
    var shiftElement = this[0];
    
    for(var i=1;i<this.length;i++){
        this[i-1]=this[i]
    }
    delete this[this.length - 1];
    this.length=this.length -1;
    return shiftElement;
    }

Murray.prototype.slice=function(i1, i2){
    var sliceMurray=new Murray;
    for(var i =i1; i< i2; i++ ){
        sliceMurray.push(this[i]);
    }
    return sliceMurray;
}

Murray.prototype.unshift=function(){
    
    var newArray=[];
    var murrayLength=this.length;
    for(var i=0;i<murrayLength;i++){
        
        newArray[i]=this[i];
        delete this[i];
        this.length=this.length-1;
    }
    for(var i = 0; i<arguments.length;i++){
       
        this[i]=arguments[i];
        this.length=this.length+1;
    }
    for(var i = 0; i<(murrayLength);i++){
        
        this.push(newArray[i])
    }
    return this.length;
    }


Murray.prototype.includes=function(element){
        for(var i = 0; i<this.length; i++){
            if(this[i] === element) {
                return true;
            }
        }
        return false;
    }