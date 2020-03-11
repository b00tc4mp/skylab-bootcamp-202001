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

    let companyName, username

    beforeEach(() => {
        companyName = (`companyname${random()}`).slice(0, 19)
        username = (`username${random()}`).slice(0, 29)
    })

    describe('when company or username already exists', () => {

        beforeEach(async () => {
            await registerCompany({ company: { name: companyName }, user: { username } })
        })

        it('should fail with company name already exists', () => {
            return registerCompany({ company: { name: companyName }, user: { username } })
                .then(() => { throw new Error('should not reach here') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.be.a('string')
                    expect(error.message).to.equal('The company name is already taken')
                })
        })

        it('should fail with username already exists', () => {
            return registerCompany({ company: { name: companyName + 'a' }, user: { username } })
                .then(() => { throw new Error('should not reach here') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.be.a('string')
                    expect(error.message).to.equal('The username is already taken')
                })
        })


    })

    it('should fail with name field from company is empty', () => {
        return registerCompany({ company: { name: '' }, user: { username } })
            .then(() => { throw new Error('should not reach here') })
            .catch(error => {
                expect(error).to.be.an.instanceof(ContentError)
                expect(error.message).to.be.a('string')
                expect(error.message).to.equal('name is empty')
            })
    })

    it('should fail with username field from user is empty', () => {
        return registerCompany({ company: { name: companyName }, user: { username: '' } })
            .then(() => { throw new Error('should not reach here') })
            .catch(error => {
                expect(error).to.be.an.instanceof(ContentError)
                expect(error.message).to.be.a('string')
                expect(error.message).to.equal('username is empty')
            })
    })

    it('should add a company and user successfully', () => {
        return registerCompany({ company: { name: companyName }, user: { username } })
            .then(response => {
                expect(response).to.be.an('undefined')

                return Promise.all([Company.findOne({ name: companyName }), User.findOne({ username })])
            })
            .then(([company, user]) => {
                debugger
                expect(company.name).to.equal(companyName)
                expect(user.username).to.equal(username)
                const firstName = username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase()
                expect(user.firstName).to.equal(firstName)
                expect(user.role).to.equal('owner')
            })
    })

    after(() =>
        Promise.all([Company.deleteMany(), User.deleteMany()])
            .then(() => mongoose.disconnect()))
})