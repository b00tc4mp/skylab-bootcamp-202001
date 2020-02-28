// TODO
const registerUser  = require('./register-user')
const {expect} = require('chai')

describe('registerUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email =  'a@mail.com' 
        password = 'password-' + Math.random()
    })

    it('should succeed on a new user', () => 
        registerUser(name,surname,email,password)
        .then(response =>{
            expect(response).to.be.an('undefined')
        })
    )


    describe('when user already exists', () => {
    
    })

})
