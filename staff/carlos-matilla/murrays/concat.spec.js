describe('Test CONCAT', function() {
    it('should return two arrays joined', function() {
        var murray1 = new Murray(1, 2, 3)
        var murray2 = new Murray(4, 5, 6)
        var result = murray1.concat(murray2)
        expect(result.length).toBe(6)
        expect(result[0]).toBe(murray1[0])
        expect(result[1]).toBe(murray1[1])
        expect(result[2]).toBe(murray1[2])
        expect(result[3]).toBe(murray2[0])
        expect(result[4]).toBe(murray2[1])
        expect(result[5]).toBe(murray2[2])
        
    })
    it('should return inlimited murrays joined', function() {
        var murray1 = new Murray(1, 2, 3)
        var murray2 = new Murray(4, 5, 6)
        var murray3 = new Murray(7, 8, 9)
        var murray4 = new Murray(10, 11, 12)
        var result = murray1.concat(murray2, murray3, murray4)
        expect(result.length).toBe(12)
        for(var i = 0; i < result.length; i++) {
            expect(result[i]).toBe(i + 1)
        }
    })
    it('should the original murray not mutate', function() {
        var murray1 = new Murray(1, 2, 3)
        var murray2 = new Murray(4, 5, 6)
        var result = murray1.concat(murray2)
        expect(murray1[0]).toBe(1)
        expect(murray2[0]).toBe(4)
        expect(murray1.length).toBe(3)
        expect(murray2.length).toBe(3)
    })
   
})