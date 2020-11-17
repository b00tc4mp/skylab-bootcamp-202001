require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('simonline-data')

describe('retrieveUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let username, password

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when username already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ username, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid data', () =>
            retrieveUser(_id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.username).to.equal(username)
                    expect(user.password).to.be.undefined
                })
        )

        it('should fail on invalid id', () =>
            expect(() => {
                retrieveUser(`${_id}--wrong`)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch((error) => {
                        expect(error).to.eql(NotFoundError, `user with id ${id} does not exist`)
                    })
            })
        )


        it('should fail on a non-string gameId', () => {
            let id = 1
            expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = false
            expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = undefined
            expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

            id = []
            expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})