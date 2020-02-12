describe('Register user', () => {
  let name, surname, phone, email, username, password

  beforeEach(() => {
    name = 'magic' + Math.random()
    surname = 'magic' + Math.random()
    phone = String(parseInt(Math.random()*1000000000))
    email = 'magic'+ Math.random() + '@gmail.com'
    username = 'magic' + Math.random()
    password = 'magic' + Math.random()
  })

  it('Should succeed user registered', done => {
    registerUser({name, surname, phone, email, username, password}, (error, response) => {
      expect(error).toBeUndefined()
      expect(response).toBe("user registered!")
      done()
    })
  })

  describe('When user already exist', () => {
    beforeEach(done => {
      call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, phone, email, username, password, mtg: true })
      }, (error, response) => {
        // Network Error
        if (error) return callback(error)
        // Error if user already exist
        if (response.content) {
            const {error: _error} = JSON.parse(response.content)
            if (_error) return callback(new Error(_error))
        } 
        callback(undefined, "user registered!")
        done()
      })
    })

    it('Should fail when same user exist', done => {
      registerUser({name, surname, phone, email, username, password}, (error, response) => {
        expect(error).toBeDefined()
        expect(error.message).toBe(`user with username "${username}" already exists`)
        expect(response).toBeUndefined()
        done()
      })
    })

    afterEach(done => {
      call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }, (error, response) => {
            if (error) return done(error)

            const { error: _error, token } = JSON.parse(response.content)

            if (_error) return done(new Error(_error))

            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }
            })
        })
    })
  })
})

