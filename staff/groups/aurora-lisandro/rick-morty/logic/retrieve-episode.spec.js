describe('retrieveEpisode', () => {
    it('should succed on valid id', done => {
        const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 25, 30]

        const id = ids.random()

        retrieveEpisode(id, (error, episode) => {
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
        retrieveEpisode(id, error => {
            expect(error).toBeDefined()

            expect(error.message).toBe('Episode not found')

            done()
        })
    })

    it('should fail on non-number id', () => {
        const id = '4'
        expect(() => retrieveEpisode(id, () => { })).toThrowError(TypeError, `id ${id} is not a number`)
    })
})