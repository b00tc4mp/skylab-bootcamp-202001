describe('addCardToSale', () => {
    let name, surname, phone, email, username, password, token

    beforeEach(() => {
        name = 'vam' + Math.random()
        surname = 'vam' + Math.random()
        phone = 'vam' + Math.random()
        email = 'vam@' + Math.random() + '.com'
        username = 'vam' + Math.random()
        password = 'vam' + Math.random()
    })

    describe('when user already exists', () => {

        beforeEach((done) => {
            call('https://skylabcoders.herokuapp.com/api/v2/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, surname, phone, email, username, password})
            }, (error, response) => {

                if(error) return done(error)

                if (response.content) {
                    const {error: _error} = JSON.parse(response.content)
                    if (_error) return done(new Error(_error))
                }

                call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username, password})
                }, (error, response) => {

                    if(error) return done(error)
                    const {error: _error, token: _token} = JSON.parse(response.content)
                    if (_error) return done(new Error(_error))

                    token = _token
                    done()
                })
            })

        })

        it('should succeed on correct token', done => {
            const card = {multiverseid: Math.random()}

            addCardToSale(card, token, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBe('update successful!')

                call('https://skylabcoders.herokuapp.com/api/v2/users', {
                    method: 'GET',
                    headers: {Authorization: `Bearer ${token}`}
                }, (error, response) => {

                    if (error) return done(error)
                    const user = JSON.parse(response.content), {error: _error} = user
                    if (_error) return done(new Error(_error))

                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.phone).toBe(phone)
                    expect(user.email).toBe(email)
                    expect(user.username).toBe(username)
                    expect(user.password).toBeUndefined()
                    expect(user.toSale.length).toBe(1)


                    call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({username, password})
                    }, (error, response) => {

                        if (error) return done(error)
                        const {error: _error, token: _token} = JSON.parse(response.content)
                        if (_error) return done(new Error(_error))

                        expect(typeof _token).toBe('string')
                        done()
                    })
                })
            })
        })

        it('should fail on invalid token', done => {
            const card = {multiverseid: Math.random()}

            addCardToSale(card, token + '-wrong', (error, response) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('invalid token')
                expect(response).toBeUndefined()

                done()
            })
        })

        afterEach((done) => {
            call('https://skylabcoders.herokuapp.com/api/v2/users', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                body: JSON.stringify({username, password})
            }, (error, response) => {

                if(error) return done(error)

                if (response.content) {
                    const {error} = JSON.parse(response.content)
                    if (error) return done(new Error(error))
                }

                done()

            })
        })



    })     

})

/*
it('should succeed on correct token', done => {
    name += '-update'
    surname += '-update'
    username += '-update'
    oldPassword = password
    password += '-update'

    updateUser(token, { name, surname, username, oldPassword, password }, (error, response) => {
        expect(error).toBeUndefined()
        expect(response).toBeUndefined()

        call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, (error, response) => {
            if (error) return callback(error)

            // retrieve user to check public info has actually been updated

            const user = JSON.parse(response.content), { error: _error } = user

            if (_error) return callback(new Error(_error))

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.username).toBe(username)
            expect(user.password).toBeUndefined()

            // authenticate user to check password has actually been updated

            call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            }, (error, response) => {
                if (error) return callback(error)

                const { error: _error, token } = JSON.parse(response.content)

                if (_error) return done(new Error(_error))

                expect(token).toBeA('string')

                done()
            })

        })
    })
})
*/