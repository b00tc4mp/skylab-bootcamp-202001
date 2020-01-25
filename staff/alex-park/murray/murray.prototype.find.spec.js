describe('Murray.prototype.find', function() {
    it('should return the first element of the murray that meets the criteria', function () {
        var murray = new Murray(10,20,30,40,50);
        var found = murray.find(function(value){return value > 40});

        expect(found).toBe(50);
    });
})