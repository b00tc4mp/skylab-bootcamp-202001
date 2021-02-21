require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const { Company, User } = require('crediday-models')
const { registerCompany, confirmCompany } = require("..")


describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await [Company.deleteMany(), User.deleteMany()]
    })

    let companyName, username, email, password

    beforeEach(() => {
        companyName = (`companyname${random()}`).slice(0, 19)
        username = (`username${random()}`).slice(0, 29)
        email = (`email${random()}@mail.com`)
        password = (`password${random()}`)
    })

    describe('when user and company already exists', () => {
        beforeEach(async () => {
            await registerCompany({ companyName, username, email, password })
            const company = await Company.findOne({ name: companyName })
            await confirmCompany(company.id)
        })

        it('should succed on correct auth', async () => {
            const id = await authenticateUser({ username, password })
            expect(id).to.be.a('string')
        })

        it('should fail with not strings', async () => {
            try {
                const id = await authenticateUser({ username: 1, password })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error.message).to.equal('username 1 is not a string')
            }
        })

        it('should fail with incorrect credential', async () => {
            try {
                const id = await authenticateUser({ username: username + 'wrong', password })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error.message).to.equal('Credenciales incorrectas')
            }
        })
    })

    after(() =>
        Promise.all([Company.deleteMany(), User.deleteMany()])
            .then(() => mongoose.disconnect()))
})