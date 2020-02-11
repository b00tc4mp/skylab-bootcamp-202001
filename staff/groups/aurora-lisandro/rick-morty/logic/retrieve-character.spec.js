describe ('retrieve character', ()=> {
    let callback, id
    it ('should succeed on matching vehicle id', done => {
        const id = Math.floor((Math.random()*492)+1)

        retrieveCharacter(id, (error, character) => { debugger
            expect(error).toBeUndefined()
            expect(character).toBeDefined()
            expect(id).toBeA('number')
            expect(character.id).toBe(id)
            expect(character.name).toBeA('string')
            expect(character.status).toBeA('string')
            expect(character.species).toBeA('string')
            expect(character.gender).toBeA('string')

            done()
        }) 
    })

    it('should fail on incorrect id', done => {
        id= 7897987549738

        retrieveCharacter (id, (error, character) => {
            expect(error.message).toBe('Character not found')
            done()

        })

    })

    it ('should fail when the id is not a number', () => {
        id = 'hello'
        expect(() => {
            retrieveCharacter(id, () => {})
        }).toThrowError(TypeError, `id ${id} is not a number`)

        id = {}
        expect(() => {
            retrieveCharacter(id, () => {})
        }).toThrowError(TypeError, `id ${id} is not a number`)

        id = true
        expect(() => {
            retrieveCharacter(id, () => {})
        }).toThrowError(TypeError, `id ${id} is not a number`)

    } )

    it ('should fail when the callback is not a function', () => {
        id=1
        callback='hello'
        expect(() => {
            retrieveCharacter(id, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)

        id=1
        callback=1
        expect(() => {
            retrieveCharacter(id, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)

        id=1
        callback=true
        expect(() => {
            retrieveCharacter(id, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)

        id=1
        callback={}
        expect(() => {
            retrieveCharacter(id, callback)
        }).toThrowError(TypeError, `callback ${callback} is not a function`)
        
    } ) 
    

})