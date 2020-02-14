describe('toggleFavoritesCharacters', () => {
    let id, token, callback, name, surname, username, password

    id = Math.floor((Math.random() * 492) + 1)

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('it should succes when user already exists', () => {
        beforeEach(done => {
            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })

            }, (error, response) => {

                if (error) return done(response)

                if (response.content) {
                    const { error } = JSON.parse(response.content)
                    if (error) return done(error)
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
        })

        it('should add a character id when it was not previously there', done => {
            toggleFavoritesCharacters(token, id, (error, response) => {
                expect(error).toBeUndefined()

                call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                }, (error, response) => {
                    if (error) return done(error)

                    if (response.content) {
                        const user = JSON.parse(response.content)
                        const { error, favCharacters } = user

                        if (error) return done(new Error(error))

                        expect(favCharacters).toContain(id)

                        done()

                    }
                })
            })


        })

        describe('when fav character alredy exists', () => {
            beforeEach(done => {
                const favCharacters = [id]

                call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ favCharacters })
                }, (error, response) => {
                    if (error) return done(error)

                    if (response.content) {
                        const { error } = JSON.parse(response.content)

                        if (error) return done(new Error(error))
                    }
                    done()
                })


            })

            it('should succeed removing a character id when previously added', done => {

                toggleFavoritesCharacters(token, id, (error, response) => {
                    expect(error).toBeUndefined()

                    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    }, (error, response) => {
                        if (error) return done(error)

                        if (response.content) {
                            const user = JSON.parse(response.content)
                            const { error, favCharacters } = user

                            if (error) return callback(new Error(error))
                            expect(favCharacters).not.toContain(id)

                            done()

                        }
                    })
                })
            })


        })

    })

    it('should fail on non-string token', () => {
        token = 1
        expect(() =>
            toggleFavoritesCharacters(token, id, () => { })
        ).toThrowError(TypeError, `token ${token} is not a string`)

        token = true
        expect(() =>
            toggleFavoritesCharacters(token, id, () => { })
        ).toThrowError(TypeError, `token ${token} is not a string`)

        token = undefined
        expect(() =>
            toggleFavoritesCharacters(token, id, () => { })
        ).toThrowError(TypeError, `token ${token} is not a string`)
    })

    it('should fail on invalid token format', () => {
        token = 'abc'

        expect(() =>
            toggleFavoritesCharacters(token, id, () => { })
        ).toThrowError(Error, 'invalid token')
    })

    it('should fail on non-function callback', () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'

        callback = 1
        expect(() =>
            toggleFavoritesCharacters(token, id, callback)
        ).toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = true
        expect(() =>
            toggleFavoritesCharacters(token, id, callback)
        ).toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = undefined
        expect(() =>
            toggleFavoritesCharacters(token, id, callback)
        ).toThrowError(TypeError, `callback ${callback} is not a function`)
    })
})

