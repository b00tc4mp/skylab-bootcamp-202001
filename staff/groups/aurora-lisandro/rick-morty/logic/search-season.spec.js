describe('search-season', () => {
    let token, name, surname, username, password, appTag, querySeason

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
        appTag = 'Rick1.0'
        querySeason = 'S0' + Math.floor((Math.random() * 2) + 1).toString()
        favs = []
    })

    describe('when user alredy exists', () => {
        beforeEach(done =>
            call(`https://skylabcoders.herokuapp.com/api/v2/users`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, surname, username, password, appTag })

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

        )


        it('should get results on matching query', done => {
            searchSeason(querySeason, token, (error, results) => {

                expect(error).toBeUndefined()
                expect(results).toBeDefined()

                results.forEach(episode => {
                    expect(typeof episode.id).toBe('number')
                    expect(typeof episode.name).toBe('string')
                    expect(typeof episode.air_date).toBe('string')
                    expect(typeof episode.episode).toBe('string')
                    expect(episode.characters.length).toBeGreaterThan(0)
                    expect(typeof episode.url).toBe('string')
                    expect(typeof episode.created).toBe('string')
                    done()
                })
            })
        })

        it('should succeed on non-matching query returning an error message', done => {
            searchSeason('77777783748475437937947593', token, (error, response) => {
                expect(error.message).toBe('There is nothing here')
                done()
            })
        })
    })



    it('should fail on non-function callback', () => {
        expect(() =>
            searchSeason('', 'token', undefined)
        ).toThrowError(TypeError, 'callback undefined is not a function')

        expect(() =>
            searchSeason('', 'token', 1)
        ).toThrowError(TypeError, 'callback 1 is not a function')

        expect(() =>
            searchSeason('', 'token', true)
        ).toThrowError(TypeError, 'callback true is not a function')

        expect(() =>
            searchSeason('', 'token', 'hello')
        ).toThrowError(TypeError, 'callback hello is not a function')
    })

    it('should fail on non-string query', () => {
        const query = 1
        expect(() =>
            searchSeason(query, 'token', undefined)
        ).toThrowError(TypeError, `querySeason ${query} is not a string`)

    })

    it('should fail on non-string query', () => {
        const query = true
        expect(() =>
            searchSeason(query, 'token', undefined)
        ).toThrowError(TypeError, `querySeason ${query} is not a string`)

    })

    it('should fail on non-string query', () => {
        const query = undefined
        expect(() =>
            searchSeason(query, 'token', undefined)
        ).toThrowError(TypeError, `querySeason ${query} is not a string`)

    })
})