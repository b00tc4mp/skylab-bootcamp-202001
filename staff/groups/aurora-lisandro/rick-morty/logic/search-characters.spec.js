describe('searchCharacters', () => {
    const queryNames = ['rick', 'morty', 'sanchez', 'summer', 'Beth Smith']
    let query

    beforeEach(() => {
        query = queryNames.random()
    })

    it('should succeed on matching query', done => {
        searchCharacters(query, (error, response) => {
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

                done()
            })
        })
    })

    it('should succeed on non-matching query returning error message', done => {
        searchCharacters('no-existing-charachter', error => {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('There is nothing here')

            done()

        })
    })

    it('should fail on non-string query', () => {
        const query = 1
        expect(() => {
            searchCharacters(query, () => { })
        }).toThrowError(TypeError, `query ${query} is not a string`)
    })

    it('should fail on non-string query', () => {
        const query = true
        expect(() => {
            searchCharacters(query, () => { })
        }).toThrowError(TypeError, `query ${query} is not a string`)
    })

    it('should fail on non-string query', () => {
        const query = undefined
        expect(() => {
            searchCharacters(query, () => { })
        }).toThrowError(TypeError, `query ${query} is not a string`)
    })

    it('should fail on non-function callback', () => {
        const callback = 1
        expect(() => {
            searchCharacters(query, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
    })

    it('should fail on non-function callback', () => {
        const callback = true
        expect(() => {
            searchCharacters(query, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
    })

    it('should fail on non-function callback', () => {
        const callback = 'function'
        expect(() => {
            searchCharacters(query, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
    })
})