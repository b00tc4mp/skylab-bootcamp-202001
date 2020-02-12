fdescribe('authenticateUser', function () {
    let name, surname, phone, email, username, password

    beforeEach(() => {
        name = 'magic' + Math.random()
        surname = 'magic' + Math.random()
        phone = parseInt(Math.random()*1000000000)
        email = 'magic'+ Math.random() + '@gmail.com'
        username = 'magic' + Math.random()
        password = 'magic' + Math.random()
    })

    describe('When user already exists', () => {
        
        beforeEach(done => 
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, phone, email, username, password, mtg: true })
            }, (error, response) => {
                if (error) return callback(error)
        
                if (response.content) {
                    const {error: _error} = JSON.parse(response.content)
                    if (_error) return callback(new Error(_error))
                } 
                done()
            })
        )

        it('should succeed on correct credentials', done =>
            authenticateUser(username, password, (error, token) => {
                expect(error).toBeUndefined()
                expect(typeof(token)).toBe('string')

                const [header, payload, signature] = token.split('.')
                expect(header.length).toBeGreaterThan(0)
                expect(payload.length).toBeGreaterThan(0)
                expect(signature.length).toBeGreaterThan(0)

                done()
            })
        )

        it('should fail on wrong password', done =>
            authenticateUser(username, `${password}wrong`, (error, token) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('username and/or password wrong')
                done()
            })
        )

        it('should fail on wrong username', done =>
            authenticateUser(`${username}wrong`, password, (error, token) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('username and/or password wrong')
                done()
            })
        )

        afterEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            }, (error, response) => {
                if (error) return done(error)

                const { error: _error, token } = JSON.parse(response.content)

                if (_error) return done(new Error(_error))

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

    })

    describe('When user should be deleted', () => {
        it('should user don\'t exist', done => {
            authenticateUser(username, password, (error, token) => {
                expect(error).toBeInstanceOf(Error)
                done()
            })
        })
    })
})