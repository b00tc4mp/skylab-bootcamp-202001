fdescribe('call', ()=>{
    it('should succeed on valid url', done => {

        call('https://www.lavanguardia.com/', undefined, (error, response) => {
            expect(error).toBeUndefined()

            expect(response.status).toBe(200)
            //expect(response.content.toLowerCase().includes(target.text)).toBeTruthy()
            //expect(response.content.toLowerCase()).toContain(target.text)

            done()
        })
    })
    it('should fail on valid non-existing url', done => {
        const url = 'https://non-existing.url'

        call(url, undefined, (error, response) => {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('network error')

            expect(response).toBeUndefined()

            done()
        })
    })
})