describe('Test JOIN', function() {
    it('should return murray like a string separated any the element you prefer-1', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.join('-')
        expect(result).toBe('1-2-3')
    })

    it('should return murray like a string separated any the element you prefer-2', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.join('_')
        expect(result).toBe('1_2_3')
    })

    it('should return murray like a string separated any the element you prefer-3', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.join(' _22_ ')
        expect(result).toBe('1 _22_ 2 _22_ 3')
    })

    it('should return a comma between the elements when you dont introduce any argument', function() {
        var murray1 = new Murray(1, 2, 3)
        var result = murray1.join()
        expect(result).toBe('1,2,3')
    })
})