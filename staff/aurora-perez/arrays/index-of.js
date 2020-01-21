'use strict'

function indexOf(array, value, position) {
    var result = -1;
    if (position < 0){position = array.length + position};
    if (position===undefined){position = 0};
    for (position; position < array.length; position++) {
        if (value === array[position]) {
            result = position;
            position = array.length;
        };
    };
    return result;
};