describe('flat', function () {
    it('should return an array without nested arrays', function() {
        var array = [1, 2, [3, 4]]
        var result = flat(array)

        for (var i = 0; i<result.length; i++) {
            assert(!(result[i] instanceof Array), result[i] + ' should not be an array, but it is.')
        }
    })

    // it('should return an array which\'s length is equal to the sum of its length and the length of every nested array', function() {
    //     var array = [1, 2, [3, 4], 5, [6, 7, [8]]]
    //     var result = flat(array, 2)

    //     var length = 0
    //     var depth = 2

    //     function check (array) {
    //         function nested (element) {
    //             for (var j = 0; j<element.length; j++) {
    //                 length += 1
    //                 num = element[j] 
    //             }
    //         }
    
    //         for (var i = 0; i<array.length; i++) {  
    //             var num = array[i]
    
    //             if (array[i] instanceof Array) {
    //                 for (var k = 0; k<depth; k++ ) {
    //                         if (num instanceof Array) {nested(num)}
    //                     }
    //                 } 
    //             else length += 1
    //         }
    //     }
    //     var result
        

    //     assert(result.length === length, 'the resulted array\'s lenght should be ' + length + ' but instead it is ' + result.length)

    // })

    it('should obey to its depth parameter, in case it is passed', function() {
        var array = [1, 2, [3, 4], 5, [6, 7, [8]]]
        var result = flat(array, 2)

        assert(!(result[i] instanceof Array), result[i] + ' should not be an array, but it is.')
    })

    it ('should work even though depth is not a number', function() {

    })

    it('should work even if more than two parameters are passed and return flat for depth === 1', function() {

    })

    it('should fail if the first parameter passed is not an array', function() {
        (function(){
            var _error
            try{
                flat('olá')
            } catch (error) {
                _error = error
            } finally {
                assert(_error instanceof TypeError, 'should the error be of TypeError')
                assert(_error.message === 'olá is not an Array', 'should fail with message "olá is not an Array"')
            }
    
        })();
    })
})