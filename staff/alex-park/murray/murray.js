'use strict';

function Murray() {
    var _arguments = arguments;

    var initializeWithLength = (function () {
        if (_arguments.length === 1 && typeof _arguments[0] === 'number')
            if (Number.isInteger(_arguments[0]) && _arguments[0] > 0)
                return true;
            else throw new RangeError('Invalid murray length')

        return false;
    })();

    if (initializeWithLength) {
        this.length = _arguments[0];
        for (var i = 0; i < _arguments[0]; i++) {
            this[i] = undefined;
        }
    } else {
        this.length = _arguments.length;
        for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    }
}

Murray.prototype.push = function() {
    for(var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
        this.length++;
    }
    return this.length;
};

Murray.prototype.forEach = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};

Murray.prototype.pop = function() {    
    if (this.length === 0) {
        this[0] = undefined;
        return this[0];
        
    } else {
        var poppedValue = this[this.length-1];
        this.length = --this.length;
        delete this[this.length];
        return poppedValue;
    }
};

Murray.prototype.toString = function() {
    var str = '';
    for (var i = 0; i < this.length; i++) {
        if (this[i] === undefined) {
            i === this.length-1? str += `` : str += `,`; 
        } else {
            i === this.length-1? str += `${this[i]}` : str += `${this[i]},`;

        }
    }

    return str;
};

Murray.prototype.indexOf = function(value, position) {
    if (isNaN(parseInt(position))) {position = 0};

    if (position < 0){position = this.length + position};
    if (position===undefined){position = 0};
    if (position && typeof position === 'boolean') {position = 1};

    for (position = parseInt(position); position < this.length; position++) {
        if (value === this[position]) {
            var result = position;
            return result;
        };
    };

    return -1;
};

Murray.prototype.reverse = function() {
    var reversedMurray = [];

    for (var i = 0; i < this.length; i++) {
        reversedMurray[reversedMurray.length] = this[this.length - i - 1];
    }
    
    for(var i = 0; i < this.length; i++) {
        this[i] = reversedMurray[i];
    }

    return this;
};

Murray.prototype.map = function (expression) {
    if (!(typeof expression === 'function')) {throw new TypeError(expression + " is not a function")};

    var result = new Murray;

    for (var i = 0; i < this.length; i++) {
        result[i] = expression(this[i]);
        result.length++;
    }
    
    return result;
};

Murray.prototype.join = function (separator) {
    var joinedString = '';
  
    for (var i = 0; i < this.length; i++){
        i === this.length -1?
            joinedString += `${this[i]}`:
            joinedString += `${this[i]}`+ `${separator}`;
    }
    
    return joinedString;
};

Murray.prototype.find = function (expression) {
    if (typeof expression !== 'function') {throw new TypeError(expression + ' is not a function')};

    var result;
    
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            return result = this[i]; 

        } else {
            result = undefined;
        }
    }

    return result;
};

Murray.prototype.findIndex = function (expression) {
    if (typeof expression !== 'function') {throw new TypeError(expression + ' is not a function')};

    var result = -1;

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])){ return result = i };

    }

    return result;
};

Murray.prototype.shift = function (){
    var result;

    if (this.length === 0) {
        return undefined;

    } else {
        result = this[0];
        for (var i = 0; i < this.length; i++){ this[i] = this[i+1] };
        
        this.length--;
    }

    return result;
};

Murray.prototype.filter = function (condition) {
    if (typeof condition !== 'function') throw new TypeError(condition + ' is not a function');

    var filtered = new Murray;

    for (var i = 0; i < this.length; i++) {
        if (condition(this[i])) {
            filtered[filtered.length] = this[i];
            filtered.length++;
        }
    }

    return filtered;
};

Murray.prototype.every = function (condition) {
    if (typeof condition !== 'function') {throw new TypeError (condition + ' is not a function')};

    for (var i = 0; i < this.length; i++) { if (!condition(this[i])) { return false }; };

    return true; 
};

Murray.of = function () {
    var returnedMurray = new Murray;

    for (var i = 0; i < arguments.length; i++) {
        returnedMurray[returnedMurray.length] = arguments[i];
        returnedMurray.length++;
    }

    return returnedMurray;
};

Murray.prototype.includes = function (value, position) {
    if (position && typeof position === 'boolean') {position = 1 };
    if (isNaN(parseInt(position))) { position = 0 };
    if (position < 0) { position = this.length + position };

    position = parseInt(position);
    
    for (position; position < this.length; position++) {
        if (this[position] === value) { return true };
    }

    return false;
};

Murray.prototype.concat = function () {
    var concatenated = new Murray;

    for (var i = 0; i < this.length; i++) { concatenated[i] = this[i]; concatenated.length++ };

    for (var i = 0; i < arguments.length; i++) {
        var args = arguments[i];

        if (args instanceof Array || args instanceof Murray) {
            for (var j = 0; j < args.length; j++) {
                concatenated[concatenated.length] = args[j];
                concatenated.length++;
            }
        } else { concatenated[concatenated.length] = args; concatenated.length++ };
    }

    return concatenated;
};

Murray.prototype.fill = function (value, start, end) {
    if (isNaN(parseInt(start))) { start = 0 };
    if (start === undefined) { start = 0 };
    if (start<0) { start = this.length + start };
    if (isNaN(parseInt(end))) { end = this.length };
    if (end === undefined) { end = this.length };
    if (end < 0) { end = this.length + end };

    for (start; start < end; start++) {
        
    }

    return this;
};