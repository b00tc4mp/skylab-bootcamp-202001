require('dotenv').config()
const { retrieveUser, authenticateUser } = require('.')
const { expect } = require('chai')
const { NotFoundError, NotAllowedError } = require('../errors')

describe('retrieveUser', () => {
    let id, name, surname, email
    beforeEach(async () => {
        name = 'Alex'
        surname = 'Park'
        email = 'pepitazo@gmail.com'
        password = '123'
        id = await authenticateUser(email, password)
    })

    it('should return the user on a successful user retrieve', () => {
        retrieveUser(id)
            .then(user => {
                expect(user.name === name).to.be.true
                expect(user.surname === surname).to.be.true
                expect(user.email === email).to.be.true
            })
    })

    it('should throw a NotFoundError on a failed user retrieval', () => {
        authenticateUser(email, password)
            .catch(error => {
                // expect(() => retrieveUser(error)).to.throw(NotFoundError, 'user has not been retrieved')
                expect(error.message === 'user has not been retrieved').to.be.true
                expect(error.status === 404).to.be.true
                expect(error instanceof NotFoundError).to.be.true
            })
    })

    it('should fail with a NotAllowedError on a deactivated user', () => {
        authenticateUser('pepitazo10@gmail.com', '123')
            .then(id =>
                expect(() => retrieveUser(id)).to.throw(NotAllowedError, `user with id ${id} is deactivated`)
            )
    })

    it('should fail on non-string or invalid token', () => {

        id = Boolean(true)
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = Number(5)
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = Array(1, 2, 3)
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = ''
        expect(() => retrieveUser(id)).to.throw(Error, `id is empty`)

    })
})