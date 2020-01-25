'use strict'

function Murray () {
    var _arguments = arguments

    var initializeWithLength = (function() {
        if (_arguments.length === 1 && typeof _arguments[0] === 'number')
            if(Number.isInteger(_arguments[0]))
                return true
            else throw new RangeError ('Invalid murray length')
        else return false
    })();

    this.length = initializeWithLength ? arguments[0] : arguments.length = arguments.length

    if (!initializeWithLength)
        for(var i = 0; i<arguments.length; i++) this[i] = arguments[i];
}

Murray.prototype.concat = function() {

    if (typeof this === 'function' || typeof this === 'boolean') throw new TypeError (this + 'is not an Array')

    var newArray = new Murray

    for (var i = 0; i<this.length; i++)
        {newArray[i] = this[i]
        ++newArray.length}

    for (var i = 0; i<arguments.length; i++) {
        if (arguments[i] instanceof Function) {newArray[newArray.length] = arguments[i]; ++newArray.length}
        for (var j = 0; j<arguments[i].length; j++) {
            {newArray[newArray.length] = arguments[i][j]
            ++newArray.length}
        }
    }
    return newArray
}

Murray.prototype.pop = function() {
    console.log(this[this.length])
    --this.length
}

Murray.prototype.reverse = function() {

    var newArray = new Murray()
    for (var i = this.length-1; i>-1; i--) {
        newArray[newArray.length] = this[i]
    }
    for (var i = 0; i<newArray.length; i++)
        this[i] = newArray[i]

    return this
}

Murray.prototype.slice = function () {

    var sliced = new Murray
    if (arguments[1] !== undefined && arguments[1] < this.length) {
    for (var j = arguments[0]; j<arguments[1]; j++) {
        sliced[sliced.length]=this[j]
        ++sliced.length}
    }
    else {for (var j = arguments[0]; j<this.length; j++) {
        sliced[sliced.length]=this[j]
        ++sliced.length}
    }
    return sliced
}
