describe('retrieve character of episodes', () => {
    let idArray, token, callback, name, surname, username, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('it should succed on valid token', () => {

        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })

            }, response => {

                if (response instanceof Error) return done(response)

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
        })

        it('should succeed on episode with multiples character', done => {
            const idArray = []
            let id 
            for ( let i = 0; i<10; i++){
                id = Math.floor((Math.random() * 492) + 1)
                idArray.push(id)
            }
            

            retrieveCharacterOfEpisodes(token, idArray, (error, character) => {
                expect(error).toBeUndefined()
                expect(character[0]).toBeDefined()
                expect(idArray instanceof Array).toBe(true)
                expect(typeof character[0].name).toBe('string')
                expect(typeof character[0].status).toBe('string')
                expect(typeof character[0].species).toBe('string')
                expect(typeof character[0].gender).toBe('string')

                done()
            })
        })

        it('should fail on incorrect idArray', done => {
            idArray = [7897987549738]
            
            retrieveCharacterOfEpisodes(token, idArray, (error, character) => {
                expect(error.message).toBe('Character not found')
                done()

            })

        })


        it('should fail when the idArray is not an array', () => {
            idArray = 'hello'
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, () => { })
            }).toThrowError(TypeError, `idArray ${idArray} is not an array`)

            idArray = {}
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, () => { })
            }).toThrowError(TypeError, `idArray ${idArray} is not an array`)

            idArray = true
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, () => { })
            }).toThrowError(TypeError, `idArray ${idArray} is not an array`)

        })

        it('should fail when the callback is not a function', () => {
            idArray = [1]
            callback = 'hello'
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

            idArray = [1]
            callback = 1
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

            idArray = [1]
            callback = true
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

            idArray = [1]
            callback = {}
            expect(() => {
                retrieveCharacterOfEpisodes(token, idArray, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

        })


    })

})