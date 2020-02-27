require('dotenv').config()
const { retrieveUser, authenticateUser } = require('.')
const { expect } = require('chai')

describe('retrieveUser', () => {
    let token, name, surname, email
    beforeEach(async () => {
        name = 'Alex'
        surname = 'Park'
        email = 'pepitazo@gmail.com'
        password = '123'
        token = await authenticateUser(email, password)
    })

    it('should return the user on a successful user retrieve', () => {
        retrieveUser(token)
            .then(user => {
                expect(user.name === name).to.be.true
                expect(user.surname === surname).to.be.true
                expect(user.email === email).to.be.true
            })
    })

    it('should throw an error on a failed user retrieval', () => {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        expect (() => retrieveUser(token).to.throw(Error, 'user has not been retrieved'))
    })

    it('should fail on non-string or invalid token', () => {

        token = Boolean(true)
        expect(()=> retrieveUser(token)).to.throw(TypeError, `token ${token} is not a string`) 

        token = Number(5)
        expect(()=> retrieveUser(token)).to.throw(TypeError, `token ${token} is not a string`) 

        token = Array(1,2,3)
        expect(()=> retrieveUser(token)).to.throw(TypeError, `token ${token} is not a string`) 

        token = ''
        expect(()=> retrieveUser(token)).to.throw(Error, `token is empty`) 

    })
})