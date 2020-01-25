'use strict';

function Murray() {
    var _arguments = arguments;

    var initializeWithLength = (function () {
        if (_arguments.length === 1 && typeof _arguments[0] === 'number')
            if (Number.isInteger(_arguments[0]) && _arguments[0]>0)
                return true;
            else throw new RangeError('Invalid murray length')

        return false;
    })();

    if (initializeWithLength) {
        this.length = _arguments[0];
        for (var i = 0; i < this.length; i++ ) {
            this[i] = undefined
        } 
    } else {
        this.length = _arguments.length;
         for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    }
}

Murray.prototype.push = function (value) {
    if (arguments.length===0) { 
        return this.length
    } else {
        for (var i = this.length; i < this.length + arguments.length ; i++){
            this[i]= arguments[i-this.length]
        }
        return this.length = this.length + arguments.length;
    }
};

Murray.prototype.forEach = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};

Murray.prototype.pop= function() {
    if (this.length === 0) {
        this[0] = undefined;
        return this[0];

    } else {
        var result = this[this.length-1];
        delete this[this.length-1];
        this.length = this.length-1
        return result
    };
}

Murray.prototype.toString=function() {    
    var str = '';
    for (var i = 0; i < this.length; i++) {
        if (this[i] === undefined) { 
            i === this.length-1 ? str += '' : str += ',';
        } else {i === this.length-1 ? str += `${this[i]}` : str += `${this[i]},`}
    }
    return str;
};


Murray.prototype.indexOf= function(value, position) {
    if (isNaN(position)) { position = 0;}

    if (position < 0){position = this.length + position};
    if (position===undefined){position = 0};
    if (typeof position=== 'boolean' && position){position = 1 }

    for (position =  parseInt(position); position < this.length; position++) {
        if (value === this[position]) {
            var result = position;
            return result;
        };
    };
    return -1;
};

Murray.prototype.reverse = function reverse() {
    var newMurray = [];
    for (var i = 0; i < this.length; i++) {
        newMurray[newMurray.length] = this[this.length - i - 1];
    }
    for( var i = 0; i <this.length; i++){
        this[i] = newMurray[i];
    }
    return this;
};

Murray.prototype.map = function (expression) { 
    if(typeof expression !== "function"){ throw new TypeError (expression +' is not a function')};
    
    var result = new Murray;
    for (var i = 0; i < this.length; i++) {
        result[i] = expression(this[i]);
        result.length++
    }

    return result;
}

Murray.prototype.join = function (separator) {
    var newString = '';
    for (var i = 0; i < this.length; i++){
        i == this.length -1 ? newString += `${this[i]}` : newString += `${this[i]}`+ `${separator}`
    };
    return newString;
};

Murray.prototype.concat = function (){
    var murray = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        for (var j = 0; j < arg.length; j++) {
            murray[murray.length] = arg[j];
        };
    };
    return murray;
};