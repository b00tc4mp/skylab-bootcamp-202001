'use strict'

describe('register', function () {

    var user;

    beforeEach(function () {
        users.length = 0;

        user = {
            name: 'name-' + Math.random(),
            surname: 'surname-' + Math.random(),
            username: 'username-' + Math.random(),
            password: 'password-' + Math.random()
        };
    });

    it('should add a new user to array users if the username doesn\'t already exist', function() {
        
        register(user.name, user.surname, user.username, user.password)

        expect(users).toContain(user);
    })

    afterEach( function() {
        users.length = 0;
    })

})