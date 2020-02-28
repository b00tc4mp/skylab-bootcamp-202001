const { expect } = require('chai')
require('dotenv').config()
const { ObjectId } = require('mongodb')
const { random } = Math
const { database } = require('../data')
const { registerUser } = require('../logic')

const { env: { MONGODB_URL }} = process


describe('register', () => {
    let name, surname, email, password, users
    
    before(() => {
        database.connect(MONGODB_URL)
            .then(() => users = database.collection('users'))
    })

    beforeEach(() => {
        name = 'rpc-' + random()
        surname = 'rpc-' + random()
        email = 'rpc@' + random() + '.com'
        password = 'rpc-' + random()
    })

    it('should succeed on new user', () => {
        registerUser(name, surname, email, password)
            .then(response => {
                expect(response).to.equal(undefined)
            })
            .then(() => {
                return users.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user._id).to.be.instanceOf(ObjectId)
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.created).to.be.instanceOf(Date)
            })
    })

    it('should fail if the email is already in use', () => {
        registerUser(name, surname, email, password)
            .then(() => { throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.be.defined
                expect(error).to.be.an('error')
                expect(error).to.eql(new Error(`user with email ${email} already exists`))
            })
    })

    after(() => {
        database.disconnect()
    })

})
