describe('retrieveFavEpisodes', () => {
    let name, surname, username, password, token
    const favsIds = [1, 2, 22, 19, 8, 10, 30, 17]

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
                    password,
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

        it('should return empty array if no favs added', done => {
            retrieveFavCharacters(token, (error, episodes) => {
                expect(error).toBeUndefined()
                expect(episodes).toBeDefined()

                expect(episodes instanceof Array).toBe(true)
                expect(episodes.length).toBe(0)

                done()
            })
        })

        describe('when favEpisodes exists', () => {
            beforeEach(done => {
                const favEpisodes = [favsIds.random(), favsIds.random(), favsIds.random()]

                call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ favEpisodes })
                }, (error, response) => {
                    if (error) return done(error)

                    if (response.content) {
                        const { error } = JSON.parse(response.content)
                        return callback(new Error(error))
                    }

                    done()

                })
            })
            it('should succeed on valid ids', done => {

                retrieveFavEpisodes(token, (error, episodes) => {
                    expect(error).toBeUndefined()
                    expect(episodes).toBeDefined()
                    expect(episodes.length).toBeGreaterThan(0)

                    episodes.forEach(episode => {
                        expect(typeof episode.id).toBe('number')
                        expect(typeof episode.name).toBe('string')
                        expect(typeof episode.episode).toBe('string')
                        expect(typeof episode.created).toBe('string')
                        expect(typeof episode.url).toBe('string')
                        expect(episode.characters instanceof Array).toBe(true)

                        done()
                    })

                })
            })

        })

        it('should fail on invalid token', done => {
            retrieveFavCharacters(`${token}-wrong`, error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('invalid token')

                done()
            })
        })

    })
})