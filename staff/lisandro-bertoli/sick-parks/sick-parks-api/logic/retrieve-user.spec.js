require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('sick-parks-data')
const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { NotFoundError } = require('sick-parks-errors')

describe('retrieveUser', () => {
    let name, surname, email, password


    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )


    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()

    })
    describe('when user exists', () => {
        let _id
        describe('when user is not deactivated', () => {
            beforeEach(() =>
                User.create({ name, surname, email, password })
                    .then(({ id }) => _id = id)
            )

            it('should succeed on valid id, returning the user', () => {
                return retrieveUser(_id)
                    .then(user => {
                        expect(user.constructor).to.equal(Object)
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.email).to.equal(email)
                        expect(user.password).to.be.undefined
                    })
            })
        })
    })

    describe('when user does not exist', () => {

        let id = '507f1f77bcf86cd799439011'
        it('should fail throwing not-found-error', () => {
            return retrieveUser(id)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${id} does not exist`)
                })
        })
    })
    it('should fail on non-string or empty id', () => {
        let id = 1
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = true
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = {}
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = ''
        expect(() => retrieveUser(id)).to.throw(Error, `id is empty`)
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})