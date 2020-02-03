describe('Components TEST of Errors and correct values', function () {
    it('should return the right TypeError', function (done) {
        var users = []
        createRegister('.register', function (name, surname, usernameregister, passwordregister) {
            debugger
            var user = {
                name: name,
                surname: surname,
                username: usernameregister,
                password: passwordregister
            }
            users.push(user)

            expect(users[0].name).toBe(name)    
        });
        
        done();
    })
})

