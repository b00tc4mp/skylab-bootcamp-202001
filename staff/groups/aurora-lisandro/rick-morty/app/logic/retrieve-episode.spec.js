describe('retrieveEpisode', () => {
    let name, surname, username, password, token

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
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
                    password
                })
            }, (error, response) => {
                if (error) return done(error)

                if (response.status === 409 || response.status === 400) {
                    const { error } = JSON.parse(response.content)

                    return done(new Error(error))
                }

                call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
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

        it('should succed on valid id', done => {
            const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 25, 30]

            const id = ids.random()

            retrieveEpisode(token, id, (error, episode) => {
                expect(error).toBeUndefined()

                expect(episode).toBeDefined()
                expect(episode.id).toBe(id)
                expect(typeof episode.id).toBe('number')
                expect(typeof episode.name).toBe('string')
                expect(typeof episode['air_date']).toBe('string')
                expect(typeof episode.episode).toBe('string')
                expect(episode.characters instanceof Array).toBe(true)

                done()
            })

        })

        it('should fail on non existing id', done => {
            const id = 50
            retrieveEpisode(token, id, error => {
                expect(error).toBeDefined()

                expect(error.message).toBe('Episode not found')

                done()
            })
        })

        it('should fail on invalid token', done => {
            const id = 20
            retrieveEpisode(`${token}-wrong`, id, error => {
                expect(error).toBeDefined()

                expect(error.message).toBe('invalid token')

                done()
            })
        })

        it('should fail on non-number id', () => {
            const id = '4'
            expect(() => retrieveEpisode(token, id, () => { })).toThrowError(TypeError, `id ${id} is not a number`)
        })

        it('should fail on non-number id', () => {
            const id = true
            expect(() => retrieveEpisode(token, id, () => { })).toThrowError(TypeError, `id ${id} is not a number`)
        })

        it('should fail on non-number id', () => {
            const id = undefined
            expect(() => retrieveEpisode(token, id, () => { })).toThrowError(TypeError, `id ${id} is not a number`)
        })

    })
})