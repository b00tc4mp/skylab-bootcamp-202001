describe('retrieveUser', () => {
    let name, surname, username, password, appTag, token

    beforeEach(() => {
        name = `name-${Math.random()}`
        surnname = `surnname-${Math.random()}`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        appTag = 'Rick1.0'
    })

    describe('when user exists', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
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


                call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                }, (error, response) => {
                    if (error) return done(error)

                    if (response.content) {
                        const { error, token: _token } = JSON.parse(response.content)
                        if (error) return done(new Error(error))

                        token = _token

                    }
                    done()
                })
            })
        })

        it('should succeed on valid token', done => {
            retrieveUser(token, (error, user) => {
                expect(error).toBeUndefined()
                expect(user).toBeDefined()

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.username).toBe(username)
                expect(user.appTag).toBe(appTag)
                expect(user.password).toBeUndefined()

                done()

            })
        })
    })
})