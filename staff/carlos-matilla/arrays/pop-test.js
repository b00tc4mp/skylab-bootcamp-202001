describe('Pop', function(){


    it('should delete last position of an array and keep the other ones', function(){
        (function(){
            var a = [1, 2, 3, 'Juan']
            pop(a);
            var results = [1, 2, 3]
            assert(a.length === 3, 'no ha restado el elemento')
            assert(a[0] === results[0], 'no ha respetado las posiciones del array')
            assert(a[1] === results[1], 'no ha respetado las posiciones del array')
            assert(a[2] === results[2], 'no ha respetado las posiciones del array')
        })();
    });

    it('should give it to you the last position', function(){
        (function(){
            var b = [6, 7, 8, 9];
            assert(pop(b)=== 9, 'no ha retornado el ultimo elemento')
        })();
    });

    it('should fail if the argument is not an array', function(){
        (function(){
            var _error;

            try {
                pop('hola-mundo');
            } catch (error) {
                _error=error
            }
            assert(_error instanceof TypeError, 'should error be of type TypeError');
            assert('hola-mundo is not an array', 'should fail with message "hola-mundo is not an array"')
        })();

    });





});