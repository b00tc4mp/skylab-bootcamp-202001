describe('Test UNSHIFT', function() {
    it('should add all the arguments starting the murray', function() {
        var murray1 = new Murray(1, 2, 3, 4, 5)
        murray1.unshift(-2,-1,0)
        var result = -2;
        for(var i = 0; i<murray1.length;i++){
            expect(murray1[i]).toBe(result)
            result++
        }
    })

    it('should add all the arguments starting the murray-2', function() {
        var murray1 = new Murray(33,43,'desdew', 34)
        murray1.unshift(undefined,-1,'jswsju')
        var result = [undefined,-1,'jswsju',33,43,'desdew', 34]
        for(var i = 0; i<murray1.length;i++){
            expect(murray1[i]).toBe(result[i])
            
        }
    })

    it('should modify lentgh', function() {
        var murray1 = new Murray(33,43,'desdew', 34)
        murray1.unshift(undefined,-1,'jswsju')
        expect(murray1.length).toBe(7)

    })
   
})