describe ('DEMO', function() {
    it('it should returns a shallow copy of a portion of an array into a new array from begin index to end index (end not included) without modified the original array.', function(){
        var a = [1, 2, 3, 4, 5];
        var resultA = slice(a, 2);
        assert(resultA[1] === 4, 'it should return 4, since result have sliced from index 2 on array a to beyond.');
        assert(a.length===5,'the original array should not be modified');

        var b = [1, 2, 3, 'a', 'b', 'c'];
        var resultB = slice(b, 1, -3);
        assert(resultB.length === 2, 'it should have a length of 2');
        assert(resultB[1] === 3, 'it should be 3, since it is the last sliced value from b');
    })

    it("should fail when the first argument is not an array, giving a TypeError", function() {
        (function(){
            var __error;
            var a = 1;

            try {
                slice(a);
            } catch(error) {
                __error = error;
            }

            assert((__error instanceof TypeError), 'error should be of type TypeError, but instead you got ' + __error.constructor.name);
            assert(__error.message === "1 is not an array.",'the error message should be "1 is not an array.", but instead you got ' + __error.message);
        })();

        (function(){
            var __error;
            var a = true;
            try {
                slice(a);
            } catch(error) {
                __error = error;
            }

            assert((__error instanceof TypeError), 'error should be of type TypeError, but instead you got ' + __error.constructor.name);
            assert(__error.message === "true is not an array.",'the error message should be "true is not an array.", but instead you got ' + __error.message);
        })();


        (function(){
            var __error;
            var a = 'a';
            try {
                slice(a);
            } catch(error) {
                __error = error;
            }
            
            assert((__error instanceof TypeError), 'error should be of type TypeError, but instead you got ' + __error.constructor.name);
            assert(__error.message === "a is not an array.",'the error message should be "a is not an array.", but instead you got ' + __error.message);
        })();
    });
})