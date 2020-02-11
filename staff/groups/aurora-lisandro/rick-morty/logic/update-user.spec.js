fdescribe('updateUser', () => {
    let name, surname, username, password, appTag, token

    beforeEach(() => {
        name = `name--${Math.random()}`
        surname = `surname--${Math.random()}`
        username = `username--${Math.random()}`
        password = `password--${Math.random()}`

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
                    const { error: _error } = JSON.parse(response.content)

                    if (_error) return done(new Error(_error))
                }

                call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })

                }, (error, response) => {

                    if (error) return done(error)

                    if (response.status === 200) {
                        const { token: _token } = JSON.parse(response.content)

                        token = _token
                        done()
                    } else {
                        const { error } = JSON.parse(response.content)
                        return done(error)
                    }
                })
            })

        })

        it('should succeed on valid token', done => {
            name = `${name}--update`
            surname = `${surname}--update`
            username = `${username}--update`
            const oldPassword = password
            password = `${password}--update`

            updateUser(token, { name, surname, username, password, oldPassword }, (error, response) => {
                expect(error).toBeUndefined()

                call('https://skylabcoders.herokuapp.com/api/v2/users', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                }, (error, user) => {
                    if (error) return done(error)
                    user = JSON.parse(user.content)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                    expect(user.password).toBeUndefined

                    call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    }, (error, response) => {
                        if (error) return done(error)

                        const { error: _error, token: _token } = JSON.parse(response.content)

                        expect(_error).toBeUndefined()
                        expect(_token).toBeDefined()
                        done()
                    })
                })
            })
        })

        it('should fail on invalid token', done => {
            updateUser(`invalid-${token}`, {}, error => {
                expect(error).toBeDefined()
                expect(error.message).toBe('invalid token')

                done()
            })
        })
    })

})