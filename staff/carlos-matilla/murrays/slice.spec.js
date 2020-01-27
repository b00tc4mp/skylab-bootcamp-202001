describe('Test SLICE', function() {
    it('should return the murray modified', function() {
        var murray1 = new Murray(1, 2, 3, 4, 5)
        var result = murray1.slice(1,3)
        expect(result[0]).toBe(2)
        expect(result[1]).toBe(3)
    })

    it('should return the murray modified-2', function() {
        var murray1 = new Murray(1, 2, 3, 4, 5)
        var result = murray1.slice(2,4)
        expect(result[0]).toBe(3)
        expect(result[1]).toBe(4)
    })

    it('should return the murray modified-3', function() {
        var murray1 = new Murray(1, 2, 3, 4, 5)
        var result = murray1.slice(1,7)
        expect(result[0]).toBe(2)
        expect(result[1]).toBe(3)
        expect(result[2]).toBe(4)
        expect(result[3]).toBe(5)
    })
   
})