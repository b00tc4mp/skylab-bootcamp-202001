const { expect } = require('chai')
// const validate = require('../utils/validate')
const { users } = require('../data')
const { authenticateUser, registerUser } = require('../logic')

describe('register', () => {
    let name, surname, email, password
    
    beforeEach(() => {
        name = 'rpc-' + Math.random()
        surname = 'rpc-' + Math.random()
        email = 'rpc@' + Math.random() + '.com'
        password = 'rpc-' + Math.random()
    })

    it('should succeed on new user', () => {
        registerUser(name, surname, email, password)
            .then(response => {
                expect(response).to.equal(undefined)
            })
    })

    describe('should create all user labels on db correctly', ()  => {

        it('should match with registered email', () => {
            registerUser(name, surname, email, password)
                .then(() => { 
                    let user = users.find(user => user.email === email)

                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        })
    })

    // describe('user already exist', ()  => {
    //     debugger
    //     registerUser(name, surname, email, password)
    //     it('should return error when user exist', () => {
    //         expect(() => registerUser(name, surname, email, password)).to.throw(Error, `user with email ${email} already exists`)
    //     })
    // })


})
