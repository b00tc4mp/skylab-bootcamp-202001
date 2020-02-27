const { expect } = require('.chai')
const authenticateUser = require('./authenticate-user')

describe('authenticateUser',() => {

    beforeEach(()=> {
        name = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    it('Should fail if the user have different credentials',()=> {
        password
        expect(()=> authenticateUser(name, password).to.throw(Error,"wrong credentials"))
    })
   
})