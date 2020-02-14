describe('retrieve card', function () {
    const ids = ["378512", "405354", "416797", "452899", "386586"]
    let id
    
    beforeEach(done => {
        id = parseInt(ids[parseInt(Math.floor(Math.random()*ids.length))])

        call(`https://api.magicthegathering.io/v1/cards/${id}`, undefined,
        (error, response) => {
            if (error) return callback(error)
            if (response.content.length === 0) return callback(response)

            if (response.status === 200) {
                let { card } = JSON.parse(response.content)
                callback(undefined, card)
            }
            done()
        })
    })

    it('Should succeed retrieve card with ID', done => {

        retrieveCard(id, (error, card) => {

            expect(error).toBeUndefined()
            expect(card).toBeDefined()

            done()
        })
    })

    it('Should not found card on wrong ID', done => {

        id = Math.random()

        retrieveCard(id, (error, card) => {
            expect(error).toBeUndefined()
            expect(card).toBe()
            done()
        })
    })
})
