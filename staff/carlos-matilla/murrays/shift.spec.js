describe('Test SHIFT', function() {
    it('should return shift element', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.shift()
        expect(result).toBe(1)
    })

    it('should return shift element-2', function() {
        var murray1 = new Murray(-4, 23, 32)
        var result = murray1.shift()
        expect(result).toBe(-4)
    })

    it('should return shift element-3', function() {
        var murray1 = new Murray(4, 5, 6)
        var result = murray1.shift()
        expect(result).toBe(4)
    })




    it('should modify the murray without the first element', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.shift()
        expect(murray1[0]).toBe(2)
        expect(murray1[1]).toBe(3)
        expect(murray1[2]).toBe(undefined)
        expect(murray1.length).toBe(2)
    })

    it('should modify the murray without the first element-2', function() {
        var murray1 = new Murray(-4, 23, 32)
        var result = murray1.shift()
        expect(murray1[0]).toBe(23)
        expect(murray1[1]).toBe(32)
        expect(murray1[2]).toBe(undefined)
        expect(murray1.length).toBe(2)
    })

    it('should modify the murray without the first element-3', function() {
        var murray1 = new Murray(-4, 22, 35, 84, 'ddddd')
        var result = murray1.shift()
        expect(murray1[0]).toBe(22)
        expect(murray1[1]).toBe(35)
        expect(murray1[2]).toBe(84)
        expect(murray1[3]).toBe('ddddd')
        expect(murray1[4]).toBe(undefined)
        expect(murray1.length).toBe(4)
    })
})