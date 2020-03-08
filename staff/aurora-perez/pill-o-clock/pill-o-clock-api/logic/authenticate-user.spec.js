require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const bcrypt = require('bcryptjs')

describe('authenticateUser', () => {
   let name, surname, gender, age, phone, profile, email, password

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        gender = `gender-${random()}`
        age = random()
        phone = `00000-${random()}`
        profile = `profile-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, gender, age, phone, profile, email, password })
                )
                .then(user => _id = user.id)
        )

        it('should succeed on correct and valid and right credentials', () =>
            authenticateUser(email, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
        )
    })

    // TODO more happies and unhappies

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})