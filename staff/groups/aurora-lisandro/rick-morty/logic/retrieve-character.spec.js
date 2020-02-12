describe ('retrieve character', ()=> {
    let id, token, callback, name, surname, username, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe ('it should succed on valid token', () => {  

        beforeEach(done =>{ 
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })

            }, response => {
                
                if (response instanceof Error) return done(response)

                call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password })

                }, (error,response) => {
                    if (error) return done(error)
                
                    const { error:_error, token:_token } = JSON.parse(response.content)

                    if (_error) return done (new Error (_error))

                    token = _token 
                    done()
                })
            
            })
        })      

        it ('should succeed on matching character id', done => {
            const id = Math.floor((Math.random()*492)+1)

            retrieveCharacter(token, id, (error, character) => { 
                expect(error).toBeUndefined()
                expect(character).toBeDefined()
                expect(id).toBeA('number')
                expect(character.id).toBe(id)
                expect(character.name).toBeA('string')
                expect(character.status).toBeA('string')
                expect(character.species).toBeA('string')
                expect(character.gender).toBeA('string')

                done()
            }) 
        })

        it('should fail on incorrect id', done => {
            id= 7897987549738
            debugger
            retrieveCharacter (token, id, (error, character) => {
                expect(error.message).toBe('Character not found')
                done()

            })

        })
        

        it ('should fail when the id is not a number', () => {
            id = 'hello'
            expect(() => {
                retrieveCharacter(token, id, () => {})
            }).toThrowError(TypeError, `id ${id} is not a number`)

            id = {}
            expect(() => {
                retrieveCharacter(token, id, () => {})
            }).toThrowError(TypeError, `id ${id} is not a number`)

            id = true
            expect(() => {
                retrieveCharacter(token, id, () => {})
            }).toThrowError(TypeError, `id ${id} is not a number`)

        })

        it ('should fail when the callback is not a function', () => {
            id=1
            callback='hello'
            expect(() => {
                retrieveCharacter(token, id, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

            id=1
            callback=1
            expect(() => {
                retrieveCharacter(token, id, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

            id=1
            callback=true
            expect(() => {
                retrieveCharacter(token, id, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)

            id=1
            callback={}
            expect(() => {
                retrieveCharacter(token, id, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)
            
        })

    
    })

})