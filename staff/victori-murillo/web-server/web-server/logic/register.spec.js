const register = require('./register')
const users = require('../db')

describe("register", () => {
    let user

    beforeEach(() => {
        users.length = 0

        user = {
            name: 'name-' + Math.random(),
            surname: 'surname-' + Math.random(),
            username: 'username-' + Math.random(),
            password: 'password-' + Math.random(),
        }
    })

    it('should succeed on complete correct new data', function () {
        expect(function () { 
            register(user)
        }).not.toThrow(Error)
    })

    it('should fail on matching a new username with an already created username', function () {
        users.push(user)
        
        expect(function () { 
            register(user)
        }).toThrowError(Error, 'User ' + user.username + ' already exists')
    })
    
    it('should fail when a user name is not a \'string\'', function () {
        expect(function () { 
            user.name = 1
            register(user)
        }).toThrowError(TypeError, 'name ' + 1 + ' is not a string')
    })
    
    it('should fail when a user surname is not a \'string\'', function () {
        expect(function () { 
            user.surname = 1
            register(user)
        }).toThrowError(TypeError, 'surname ' + 1 + ' is not a string')
    })
    
    it('should fail when a user username is not a \'string\'', function () {
        expect(function () { 
            user.username = 1
            register(user)
        }).toThrowError(TypeError, 'username ' + 1 + ' is not a string')
    })
    
    it('should fail when a user password is not a \'string\'', function () {
        expect(function () { 
            user.password = 1
            register(user)
        }).toThrowError(TypeError, 'password ' + 1 + ' is not a string')
    })

})