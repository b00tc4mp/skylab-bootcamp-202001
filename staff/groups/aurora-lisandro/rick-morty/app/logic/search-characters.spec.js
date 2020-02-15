describe('searchCharacters', () => {
    let name, surname, username, password, appTag, token, query, ids

    const queryValues = {
        'rick sanchez': ['1', '290', '293'],
        'morty smith': ['2', '232', '234'],
        'beth': ['4', '47', '38', '39', '40']
    }


    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        appTag = 'Rick1.0'

        query = Object.keys(queryValues).random()
        ids = queryValues[query]
    })

    describe('when user exists', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    surname,
                    username,
                    password,
                    appTag
                })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })

                }, (error, response) => {
                    if (error) return done(error)

                    if (response.content) {
                        const { error, token: _token } = JSON.parse(response.content)

                        if (error) return done(new Error(error))

                        token = _token
                        done()
                    }
                })
            })
        })
        it('should succeed on matching query with false isFavs', done => {
            searchCharacters(query, token, (error, response) => {
                const { results, info } = response

                expect(info).toBeDefined()
                expect(results.length).toBeGreaterThan(0)

                expect(results).toBeDefined()
                expect(results.length).toBeGreaterThan(0)

                results.forEach(character => {
                    expect(typeof character.id).toBe('number')
                    expect(typeof character.name).toBe('string')
                    expect(typeof character.status).toBe('string')
                    expect(typeof character.species).toBe('string')
                    expect(typeof character.gender).toBe('string')
                    expect(typeof character.origin).toBe('object')
                    expect(typeof character.location).toBe('object')
                    expect(typeof character.isFav).toBeFalsy()


                    done()
                })
            })
        })

        it('should succeed on non-matching query returning error message', done => {
            searchCharacters({}, token, error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('There is nothing here')

                done()

            })
        })

        //TODOOO

        // it('should the isFav prop be added to the character', done => {
        //     searchCharacters(query, token, (error, response) => {
        //         const { results, info } = response

        //         expect(results)
        //     })
        // })
        it('should fail on non-string query', () => {
            const query = 1
            expect(() => {
                searchCharacters(query, token, () => { })
            }).toThrowError(TypeError, `query ${query} is not a string`)
        })

        it('should fail on non-string query', () => {
            const query = true
            expect(() => {
                searchCharacters(query, token, () => { })
            }).toThrowError(TypeError, `query ${query} is not a string`)
        })

        it('should fail on non-string query', () => {
            const query = undefined
            expect(() => {
                searchCharacters(query, token, () => { })
            }).toThrowError(TypeError, `query ${query} is not a string`)
        })

        it('should fail on non-function callback', () => {
            const callback = 1
            expect(() => {
                searchCharacters(query, token, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)
        })

        it('should fail on non-function callback', () => {
            const callback = true
            expect(() => {
                searchCharacters(query, token, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)
        })

        it('should fail on non-function callback', () => {
            const callback = 'function'
            expect(() => {
                searchCharacters(query, token, callback)
            }).toThrowError(TypeError, `callback ${callback} is not a function`)
        })
    })


})