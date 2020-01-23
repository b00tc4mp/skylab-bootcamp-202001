describe('concat',function(){
    it('should return an array',function(){
        var response = concat([1,2,3],'value');

        assert(response instanceof Array, 'should return an array');
    });
});