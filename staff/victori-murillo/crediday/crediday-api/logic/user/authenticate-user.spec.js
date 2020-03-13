require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const { Company, User } = require('crediday-models')
const { ContentError } = require('crediday-errors')


describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await [Company.deleteMany(), User.deleteMany()]
    })

    let companyName, username

    beforeEach(() => {
        companyName = (`companyname${random()}`).slice(0, 19)
        username = (`username${random()}`).slice(0, 29)
    })

    describe('when company or username already exists', () => {

        beforeEach(async () => {

        })

    })

    after(() =>
        Promise.all([Company.deleteMany(), User.deleteMany()])
            .then(() => mongoose.disconnect()))
})