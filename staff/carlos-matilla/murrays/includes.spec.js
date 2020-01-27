describe('Test INCLUDES', function() {
    it('should check if the element is inside the array', function() {
        var murray1 = new Murray(1, 2, 3, 4, 5)
        var result=murray1.includes(-2)
        expect(result).toBe(false)
    })

    it('should check if the element is inside the array-2', function() {
        var murray1 = new Murray(1, 2, 3, 4, 5)
        var result=murray1.includes(2)
    })


 
   
})