const { expect } = require('chai')
const { registerUser } = require('.')
const { users } = require('../data')

describe('registerUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = 'email-' + Math.random() + '@hotmail.com'
        password = 'password-' + Math.random()
    })

    it('should succeed on a new user', () => 
        registerUser(name, surname, email, password)
        .then(() => {
            let user = users.find(user => user.email === email)
            expect(user.name === name).to.be.true
            expect(user.surname === surname).to.be.true
            expect(user.email === email).to.be.true
            expect(user.password === password).to.be.true
        })
    )

    it('should fail on an already existing user', () => {
        name = 'oso'
        surname = 'osito'
        email = 'oso@oso.com'
        password = '123'
        expect(()=> registerUser(name, surname, email, password)).to.throw(Error, `user with email ${email} already exists`)
    })

    it('should fail on non-string or empty name', () => {
        name = Boolean(true)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `name ${name} is not a string`) 

        name = Number(5)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `name ${name} is not a string`) 

        name = Array(1,2,3)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `name ${name} is not a string`) 

        name = ''
        expect(()=> registerUser(name, surname, email, password)).to.throw(Error, `name is empty`) 

    })

    it('should fail on non-string or empty name', () => {
        name = 'example'

        surname = Boolean(true)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `surname ${surname} is not a string`) 

        surname = Number(5)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `surname ${surname} is not a string`) 

        surname = Array(1,2,3)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `surname ${surname} is not a string`) 

        surname = ''
        expect(()=> registerUser(name, surname, email, password)).to.throw(Error, `surname is empty`) 

    })

    it('should fail on non-string or invalid email', () => {
        name = 'example2'
        surname = 'surname2'

        email = Boolean(true)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `email ${email} is not a string`) 

        email = Number(5)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `email ${email} is not a string`) 

        email = Array(1,2,3)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `email ${email} is not a string`) 

        email = 'jhfbsdf@aaaa'
        expect(()=> registerUser(name, surname, email, password)).to.throw(Error, `${email} is not an email`) 

    })

    it('should fail on non-string or empty password', () => {
        name = 'example2'
        surname = 'surname2'
        email = 'example@gmail.com'

        password = Boolean(true)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `password ${password} is not a string`) 

        password = Number(5)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `password ${password} is not a string`) 

        password = Array(1,2,3)
        expect(()=> registerUser(name, surname, email, password)).to.throw(TypeError, `password ${password} is not a string`) 

        password = ''
        expect(()=> registerUser(name, surname, email, password)).to.throw(Error, `password is empty`) 

    })
})