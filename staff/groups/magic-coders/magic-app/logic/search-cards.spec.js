describe('searchCards', () => {
    let name, surname, username, password, token

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {
        beforeEach(done =>
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                }, (error, response) => {
                    if (error) return done(error)

                    const { error: _error, token: _token } = JSON.parse(response.content)

                    if (_error) return done(new Error(_error))

                    token = _token

                    done()
                })
            })
        )

        // <-- Sometimes works because the API delay 15 seconds  -->
        

        // it('should succeed on correct query', done => {
        //     let query = {
        //         types: "Creature",
        //         rarity: "Rare",
        //         name: "elfy"
        //     }
        //     searchCards(query, (error, cards) => {
        //         expect(error).toBeUndefined()
        //         expect(cards).toBeDefined()
        //         expect(cards.length).toBeGreaterThan(0)

        //         done()
        //     })
        // })



        afterEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                done()
            })
        })
    })

    it('should fail on non-object query', () => {

        let query = 1
        let callback = function() {}
        
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `query ${query} is not an object`)

        query = true
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `query ${query} is not an object`)

        query = undefined
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `query ${query} is not an object`)

        query = undefined
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `query ${query} is not an object`)
    }) 
    
    it('should fail on non-function callback', () => {
       
        let query = {
            types: "Creature",
            rarity: "Rare",
            name: "elf"
        }
        let callback = 1
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = true
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = undefined
        expect(() =>
            searchCards(query, callback)
        ).toThrowError(TypeError, `callback ${callback} is not a function`)
    }) 

    
})