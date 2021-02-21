require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const { mongoose } = require('events-models')
const { User } = require('events-models')

describe('authenticateUser', () => {
    before(() => mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }))

    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = 'email' + random() + '@mail.com'
        password = 'password-' + random()
    })

    describe('when user already exist', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => _id = user.id)
        )

        it('should succed on right credentials', () =>
            authenticateUser(email, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
        )
    })

    after(() => mongoose.disconnect())
})

