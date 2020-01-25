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
    if (isNaN(position)) {position = 0};

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

Murray.prototype.reverse= function() {
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

    var result = [];
    for (var i = 0; i < this.length; i++) {
        result[i] = expression(this[i]);
    }
    
    return result;
};