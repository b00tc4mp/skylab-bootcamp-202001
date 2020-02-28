require('dotenv').config()
const { registerUser } = require('.')
const { expect } = require('chai')
const { database } = require('../data')
const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let name, surname, email, password, users

    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => users = database.collection('users'))
    )

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${Math.random()}@email.com`
        password = `password-${Math.random()}`

    })

    it('should succed no creating a new user, no return value expected', () => {
        debugger
        registerUser(name, surname, email, password)
            .then(retVal => {
                expect(retVal).to.be.undefined

                expect(user.name).to.be.equal(name)
                expect(user.username).to.be.equal(username)
                expect(user.email).to.be.equal(email)
                expect(user.password).to.be.equal(password)

                expect(user).to.have.property(created)
                expect(user).to.have.property(id)
            })
    })

    after(() => database.disconnect())
})

