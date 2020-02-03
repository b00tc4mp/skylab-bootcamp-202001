describe('retrieve vehicles',function(){
    it('should succeed on matching id', function(done){
        retrieveVehicle('FYG29',function(response){
            expect(response).toBeDefined();
                expect(response).not.toBeInstanceOf(Error);
                expect(typeof response.name).toBe('string');
                expect(typeof response.collection).toBe('string');
                expect(typeof response.description).toBe('string');
                expect(typeof response.price).toBe('number');
            
            done();
        });
    });

    it('should fail if non string id',function(){
        expect(function(){
            retrieveVehicle(true, function(){});
        }).toThrowError(TypeError, 'true is not a string');

        expect(function(){
            retrieveVehicle(1234,function(){});
        }).toThrowError(TypeError, '1234 is not a string');

    });

});