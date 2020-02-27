const { expect } = require('chai')
const { authenticateUser, registerUser } = require('../logic')
const uuid = require('uuid/v4')

describe('authenticateUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = 'email-' + Math.random() + '@hotmail.com'
        password = 'password-' + Math.random()
        registerUser(name, surname, email, password)
    })

    it('should succeed on a valid auth', () => 
        authenticateUser(email, password)
        .then(token => {
            expect(token).to.be.a('string')

            const [, payload ] = token.split('.')
            expect(payload).to.be.a('string')
            expect(payload.length > 0).to.be.true
        })
    )

    it('should fail to auth a user on wrong credentials', () => 
        expect(() => {
            authenticateUser(email, `${password}-wrong`)
        }).to.throw(Error, 'wrong credentials')
    )

    it('should fail on non-string or invalid email', () => {
        name = 'example2'
        surname = 'surname2'

        email = Boolean(true)
        expect(()=> authenticateUser(email, password)).to.throw(TypeError, `email ${email} is not a string`) 

        email = Number(5)
        expect(()=> authenticateUser(email, password)).to.throw(TypeError, `email ${email} is not a string`) 

        email = Array(1,2,3)
        expect(()=> authenticateUser(email, password)).to.throw(TypeError, `email ${email} is not a string`) 

        email = 'jhfbsdf@aaaa'
        expect(()=> authenticateUser(email, password)).to.throw(Error, `${email} is not an email`) 

    })

    it('should fail on non-string or empty password', () => {
        name = 'example2'
        surname = 'surname2'
        email = 'example@gmail.com'

        password = Boolean(true)
        expect(()=> authenticateUser(email, password)).to.throw(TypeError, `password ${password} is not a string`) 

        password = Number(5)
        expect(()=> authenticateUser(email, password)).to.throw(TypeError, `password ${password} is not a string`) 

        password = Array(1,2,3)
        expect(()=> authenticateUser(email, password)).to.throw(TypeError, `password ${password} is not a string`) 

        password = ''
        expect(()=> authenticateUser(email, password)).to.throw(Error, `password is empty`) 

    })
})