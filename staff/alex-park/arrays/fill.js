'use strict'

function fill (array, value, start, end) {
    if(start === undefined) {start = 0};
    if(start<0) {start = array.length+start};
    if (end === undefined) {end = array.length};
    if (end<0) {end = array.length+end};
    do {
        array[start] = value;
        start++;
    } while (start !== end);
    return array;
};