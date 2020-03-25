require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const registerCompany = require('./register-company')
const { Company, User } = require('crediday-models')
const { ContentError } = require('crediday-errors')


describe('registerCompany', () => {
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

    describe('when company or username already exists', () => {

        beforeEach(async () => {
            await registerCompany({ companyName, username, email, password })
        })

        it('should fail with company name already exists', async () => {
            try {
                await registerCompany({ companyName, username, email, password })
                throw new Error('should not reach here')
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.be.a('string')
                expect(error.message).to.equal('El nombre de Compañia ya existe')
            }
        })

        it('should fail with username already exists', async () => {
            try {
                await registerCompany({ companyName: companyName + 'a', username, email, password })
                throw new Error('should not reach here')
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.be.a('string')
                expect(error.message).to.equal('El nombre de Usuario ya existe')
            }
        })
    })

    it('should fail with name field from company is empty', async () => {
        try {
            await registerCompany({ companyName: '', username })
            throw new Error('should not reach here')
        } catch (error) {
            expect(error).to.be.an.instanceof(ContentError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('Nombre de Compañia vacío')
        }
    })

    it('should fail with username field from user is empty', async () => {
        try {
            await registerCompany({ companyName, username: '' })
            throw new Error('should not reach here')
        } catch (error) {
            expect(error).to.be.an.instanceof(ContentError)
            expect(error.message).to.be.a('string')
            expect(error.message).to.equal('Nombre de Usuario vacío')
        }
    })

    it('should add a company and user successfully', async () => {
        const response = await registerCompany({ companyName, username, email, password })
        expect(response).to.equal(email)

        const company = await Company.findOne({ name: companyName })
        const user = await User.findOne({ username })

        expect(company.name).to.equal(companyName)
        expect(user.username).to.equal(username)
        const firstName = username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase()
        expect(user.firstName).to.equal(firstName)
        expect(user.role).to.equal('owner')

    })

    after(() =>
        Promise.all([Company.deleteMany(), User.deleteMany()])
            .then(() => mongoose.disconnect()))
})