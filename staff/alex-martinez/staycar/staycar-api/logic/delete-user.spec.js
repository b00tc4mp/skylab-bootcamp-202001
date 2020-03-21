require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('staycar-data')

const deleteUser = require('./delete-user')

const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('deleteUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, username, password
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _user
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, username, password })
                )
                .then((user) => {
                    return _user = user
                })
        )

        it('should succed on delete an existed user', () =>{
            let _id = _user.id
            let pass = _user.password
            
            deleteUser(_id, pass)
                .then((res) => {
                    expect(res).to.be.undefined
                })
        })
    })

    it('should fail on non string id', () => {
        let id = 2
        expect(() => deleteUser(id, 'password' )).to.throw(TypeError, `id ${id} is not a string`)
    })
    it('should fail on non string password', () => {
        let password = 1234
        expect(() => deleteUser('1234', password)).to.throw(TypeError, `password ${password} is not a string`)
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
    
})