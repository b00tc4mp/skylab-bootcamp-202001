describe("Murray.prototype.concat", function() {
    it('should concatenate the murray with the argument added', function() {
        var murray = new Murray(1,2,3,4,5);
        var concated = murray.concat(6);

        expect(concated[concated.length-1]).toBe(6);
        expect(concated.length).toBe(6);
    });
})