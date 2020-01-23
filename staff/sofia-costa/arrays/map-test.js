

// console.log('Verifies that the array adds 10 to all numbers within the array')
// for (var i=0; i<a.length; i++) {
//     console.assert(a[i] === array[i] + 10, 'this should give a result of each array item + 10, in this spcecific index, the result should be '+arr[i]+10);
// };
// console.log('Verifies that the array doesn\'t grow more than 6 positions');
// console.assert(a.length === 6, "results length should equal 6");
// console.log('Verifies each element of the array')
// console.assert(a[0] === 11, "a[0] this should be 11"); 
// console.assert(a[1] === 13, "a[1] this should be 13"); 
// console.assert(a[2] === 15, "a[2] this should be 15"); 
// console.assert(a[3] === 16, "a[3] this should be 16"); 
// console.assert(a[4] === 17, "a[4] this should be 17"); 
// console.assert(a[5] === 19, "a[5] this should be 19");
// console.log('Verifies if something\'s passed in the function argument')


// var _error= undefined;
// try {
//     map(1)
// } catch (error) {
//     _error = error;
// } finally {
//     console.assert(_error instanceof TypeError, 'should the error be of TypeError');
//     console.assert(_error.message === 'undefined is not a function', 'should fail with message "undefined is not a function"');
// }


// console.log('Verifies if what is passed within our function argument is not a function')
// var _error= undefined;
// try {
//     map(array, 1)
// } catch (error) {
//     _error = error;
// } finally {
//     console.assert(_error instanceof TypeError, 'should the error be of TypeError');
//     console.assert(_error.message === '1 is not a function', 'should fail with message "1 is not a function"');
// }


// console.log('Verifies that the array is actually an Array')
// var _error= undefined;
// try {
//     map(1, function(){})
// } catch (error) {
//     _error = error;
// } finally {
//     console.assert(_error instanceof TypeError, 'should the error be of TypeError');
//     console.assert(_error.message === '1 is not an Array', 'should fail with message "1 is not an Array"');
// }


// var array = [1, 2, 3, 4]


// // map(lista, function (el) { return el * 2 })

// console.log('TEST map')

// var result = map(array, function(element) {return element * 10} )

// for (var i = 0; i<result.length; i++) {
//     console.assert(result[i] === array[i] * 10, 'not all resulted elements are equivalent to their value multiplied by 10')
// }

describe('map', function() {

    //Happy Path :)

    it('should all elements be equivalent to their value multiplied by 10', function() {
        
        var array = [1, 2, 3, 4]
        var result = map([1, 2, 3, 4], function(element) {return element * 10} )

        for (var i = 0; i<result.length; i++) {
            assert(result[i] === array[i] * 10, 'the resulted element should be equivalent to its value multiplied by 10, but it is ' + result[i])
        };

    });

    it('should the returned array\'s length be equal to the original array\'s length', function() {
        
        var array = [1, 2, 3, 4]
        var result = map(array, function(element) {return element * 10})
        assert(result.length === array.length, 'the returned array\'s length should be 4, but instead it is ' + result.length)
    });


    // Sad Path :(

    it('should fail if the first argument passed is not an array', function() {
        (function() {
            var _error;
            try {
                map(1, function(element){return element * 10})
            } catch (error) {
                _error = error
            } finally {  
                assert(_error instanceof TypeError, 'should error be of type TypeError');
                assert(_error.message === '1 is not an Array', 'should fail with message "1 is not an Array"');
                }
        })();

        (function() {
            var _error
            try {
                map('hola', function(element){return element * 10})
            } catch (error) {
                _error = error
            } finally {
                assert(_error instanceof TypeError, 'should error be of type TypeError');
                assert(_error.message === 'hola is not an Array', 'should fail with message "hola is not an Array"');
            }
        })();

        (function () {
            var _error
            try {
                map(true, function(element){return element * 10})
            } catch (error) {
                _error = error
            } finally {
                assert(_error instanceof TypeError, 'should error be of type TypeError');
                assert(_error.message === 'true is not an Array', 'should fail with message "true is not an Array"');
            }
        })();
    });

    it('should fail if the second argument passed is not a function', function() {

        (function () {
            var _error
            try {
                map([1, 2, 3, 4])
            } catch (error) {
                _error = error
            } finally {
                assert(_error instanceof TypeError, 'should error be of type TypeError');
                assert(_error.message === 'undefined is not a function', 'should fail with message "undefined is not a function"');
            }
        })();

        (function () {
            var _error
            try {
                map([1, 2, 3, 4], 'heyo')
            } catch (error) {
                _error = error
            } finally {
                assert(_error instanceof TypeError, 'should error be of type TypeError');
                assert(_error.message === 'heyo is not a function', 'should fail with message "heyo is not a function"');
            }
        })();

        (function () {
            var _error
            try {
                map([1, 2, 3, 4], true)
            } catch (error) {
                _error = error
            } finally {
                assert(_error instanceof TypeError, 'should error be of type TypeError');
                assert(_error.message === 'true is not a function', 'should fail with message "true is not a function"');
            }
        })();

    })

});



