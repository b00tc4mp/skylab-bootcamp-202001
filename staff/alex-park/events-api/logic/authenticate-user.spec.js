const { expect } = require('chai')
const { authenticateUser, registerUser } = require('../logic')
const { users } = require('../data')

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
            expect(jwt.verify(token, SECRET)).to.be.a(String)
        })
    )
})