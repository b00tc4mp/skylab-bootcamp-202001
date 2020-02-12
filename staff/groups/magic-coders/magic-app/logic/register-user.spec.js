describe('Register user', function () {
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
  })

})