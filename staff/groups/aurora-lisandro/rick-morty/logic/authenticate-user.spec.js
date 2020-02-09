describe('authenticateUser', () => {
    let name, surname, username, password, appTag

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        appTag = 'Rick1.0'
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
                    return done(new Error(error))
                }

                done()
            })
        })

        it('should succeed on correct credentials', done => {
            authenticateUser(username, password, (error, token) => {
                expect(error).toBeUndefined()

                expect(token).toBeA('string')

                const [header, payload, signature] = token

                expect(header.length).toBeGreaterThan(0)
                expect(payload.length).toBeGreaterThan(0)
                expect(signature.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on incorrect password', done => {
            authenticateUser(username, `${password}-wrong`, (error, token) => {
                expect(error).toBeInstanceOf(Error)

                expect(error.message).toBe('username and/or password wrong')
                expect(token).toBeUndefined()

                done()
            })
        })

        it('should fail on incorrect username', done => {
            authenticateUser(`${username}-wrong`, username, (error, token) => {
                expect(error).toBeInstanceOf(Error)

                expect(error.message).toBe('username and/or password wrong')
                expect(token).toBeUndefined()

                done()
            })
        })

    })


    it('should fail on non app tag', done => {
        const appTag = 'Rick-wrong'
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
                return done(new Error(error))
            }
        })

        authenticateUser(username, password, error => {
            expect(error).toBeInstanceOf(Error)


            expect(error.message).toBe('username and/or password wrong')

            done()
        })
    })

    it('should fail on no existing user', done => {
        authenticateUser(username, password, error => {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('username and/or password wrong')

            done()

        })
    })

    it('should fail on non-string username', () => {
        const username = 1
        expect(() => {
            authenticateUser(username, password, () => { })
        }).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail on non-string username', () => {
        const username = true
        expect(() => {
            authenticateUser(username, password, () => { })
        }).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail on non-string username', () => {
        const username = undefined
        expect(() => {
            authenticateUser(username, password, () => { })
        }).toThrowError(TypeError, `username ${username} is not a string`)
    })

    it('should fail on non-string password', () => {
        const password = 1
        expect(() => {
            authenticateUser(username, password, () => { })
        }).toThrowError(TypeError, `password ${password} is not a string`)
    })

    it('should fail on non-string password', () => {
        const password = true
        expect(() => {
            authenticateUser(username, password, () => { })
        }).toThrowError(TypeError, `password ${password} is not a string`)
    })

    it('should fail on non-function callback', () => {
        const callback = undefined
        expect(() => {
            authenticateUser(username, password, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
    })

    it('should fail on non-function callback', () => {
        const callback = 1
        expect(() => {
            authenticateUser(username, password, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
    })

    it('should fail on non-function callback', () => {
        const callback = true
        expect(() => {
            authenticateUser(username, password, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
    })

})