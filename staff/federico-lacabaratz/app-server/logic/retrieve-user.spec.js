const retrieveUser = require('./retrieve-user')
const users = require('../data')

describe('retrieveUser', () => {
    let user
    
    beforeEach(function () {
        users.length = 0

        user = {
            name: 'name-' + Math.random(),
            surname: 'surname-' + Math.random(),
            username: 'username-' + Math.random(),
            password: 'password-' + Math.random(),
        }
    })

    describe('when user already exists', () => {
        beforeEach(function () {
            users.push(user)
        })

        it('should succeed on correct username', () => {
            retrieveUser(username => { 
                expect(username).not.toBeInstanceOf(Error)

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.username).toBe(username)
                expect(user.password).toBeUndefined()

            })
        })
    })
        afterEachafterEach(function () {
        users.length = 0
    })

    it('should fail on non-string username', () => {
        username = 1
        expect(() =>
            retrieveUser(username => { })
        ).toThrowError(TypeError, `${username} is not a string`)

        username = true
        expect(() =>
            retrieveUser(username => { })
        ).toThrowError(TypeError, `${username} is not a string`)

        username = undefined
        expect(() =>
            retrieveUser(username => { })
        ).toThrowError(TypeError, `${username} is not a string`)

        username = null
        expect(() =>
            retrieveUser(username => { })
        ).toThrowError(TypeError, `${username} is not a string`)
    })
})