describe('flat', function () {
    it('should return an array without nested arrays', function() {

    })

    it('should return an array which\'s length is equal to the sum of its length and the length of every nested array', function() {

    })

    it('should obey to its length parameter, in case it is passed', function() {

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