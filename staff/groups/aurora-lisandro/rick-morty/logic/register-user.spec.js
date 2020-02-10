describe ('registerUser', () => {

    let name, surname, username, password

    beforeEach(()=>{
        name = 'name' + Math.random()
        surname = 'suername' + Math.random()
        username ='name' + Math.random()
        password = 'password' + Math.random()
    })

    it ('should succes on new username', done => {
        registerUser (name, surname, username, password, error => {
            expected(error).toBeUndefined()

            done()
        })
    })

    it('should the proper appTag be added', done => {
        registerUser (name, surname, username, password, error => {
            call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })

        }, response => {

            call('http://skylabcoders.herokuapp.com/api/v2/users/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },

            }, response => {
                const user = JSON.parse(response.content)

                expect(user.appTag).toBeDefined()
                expect(user.appTag).toBeA('string')

                done()

            })

        })
    })


    })

    describe ('when user already exists', () => {
        beforeEach(done => {
            call ('http://skylabcoders.herokuapp.com/api/v2/users/', {
                method: 'POST',
                headers: {'Content-Type', 'application/JSON'}
                body: JSON.stringify({ name, surname, username, password})
            }, response=> {
                if (response instanceof Error) return done(error)

                done()
            })

        })

        it ('should fail when the user exists', done => {
            registerUser(name, surname, username, password, error => {
                expected(error).toBeDefined()
                expected(error.message).toBe(`user with username "${username}" already exists`)
            }

            done()
            })
        )
    
    
    })

    



})

