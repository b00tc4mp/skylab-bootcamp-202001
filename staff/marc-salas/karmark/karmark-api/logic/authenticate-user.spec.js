require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('karmark-data')
const { ContentError, NotAllowedError } = require('karmark-errors')
const { authenticateUser } = require('./')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe.only('authenticateUser', () => {
    let username, password, _id

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`

        bcrypt.hash(password, 10)
            .then((password) => User.create({ name, surname, username, password }))
            .then((user) => _id = user.id)
        debugger
    })
    it('should succed on correct username and password', async () => {
        debugger
        const id = await authenticateUser(username, password)
        expect(id).to.exist
        expect(id).to.be.a('string')
    })
    //after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))

})