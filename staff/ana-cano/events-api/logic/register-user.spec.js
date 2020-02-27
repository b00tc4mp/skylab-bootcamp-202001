const { expect } = require('chai')
const registerUser = require('./register-user')

describe('registerUser', ()=>{
    let name = `name-${Math.random()}`
    let surname = `surname-${Math.random()}`
    let email = `mail-${Math.random()}@gmail.com`
    let password = `password-${Math.random()}`

    it('Should register a new user', ()=>{
        
        expect(()=>registerUser(name, surname, email, password)).not.to.throw()
    })

    it('Should fail if the user has been already registered', ()=>{
        expect(()=>registerUser(name, surname, email, password)).to.throw(Error, `user with email ${email} already exists`)
    })
})

