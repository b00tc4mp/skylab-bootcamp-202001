describe('Test FIND', function() {
    it('should return the item founded', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.find(3)
        expect(result).toBe(3)
    })

    it('should return the item founded', function() {
        var murray2 = new Murray(1, 2, 3, 4)
        var result = murray2.find(4)
        expect(result).toBe(4)
    })

    it('should not modify the murray ', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.find(3)
        expect(murray1[0]).toBe(1)
        expect(murray1[1]).toBe(2)
        expect(murray1[2]).toBe(3)
        
    })

    it('should return undefined if the result is not in the murray', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.find(7)
        expect(result).toBe(undefined)
        
    })
})