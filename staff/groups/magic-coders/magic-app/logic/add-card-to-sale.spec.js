describe('addCardToSale', () => {
    let name, surname, phone, email, username, password, token, card

    beforeEach(() => {
        name = 'vam' + Math.random()
        surname = 'vam' + Math.random()
        phone = 'vam' + Math.random()
        email = 'vam@' + Math.random() + '.com'
        username = 'vam' + Math.random()
        password = 'vam' + Math.random()
        card = {multiverseid: Math.random(), name: 'v', imageUrl: 'https://image.jpg', user: 'vic'}
    })

    describe('when user already exists', () => {

        beforeEach((done) => {
            call('https://skylabcoders.herokuapp.com/api/v2/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, surname, phone, email, username, password})
            }, (error, response) => {

                if(error) return done(error)

                if (response.content) {
                    const {error: _error} = JSON.parse(response.content)
                    if (_error) return done(new Error(_error))
                }

                call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username, password})
                }, (error, response) => {

                    if(error) return done(error)
                    const {error: _error, token: _token} = JSON.parse(response.content)
                    if (_error) return done(new Error(_error))

                    token = _token
                    done()
                })
            })

        })

        it('should succeed on correct token', done => {

            addCardToSale(card, token, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBe('update successful!')

                call('https://skylabcoders.herokuapp.com/api/v2/users', {
                    method: 'GET',
                    headers: {Authorization: `Bearer ${token}`}
                }, (error, response) => {

                    if (error) return done(error)
                    const user = JSON.parse(response.content), {error: _error} = user
                    if (_error) return done(new Error(_error))

                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.phone).toBe(phone)
                    expect(user.email).toBe(email)
                    expect(user.username).toBe(username)
                    expect(user.password).toBeUndefined()
                    expect(user.toSale.length).toBe(1)

                    call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({username, password})
                    }, (error, response) => {

                        if (error) return done(error)
                        const {error: _error, token: _token} = JSON.parse(response.content)
                        if (_error) return done(new Error(_error))

                        expect(typeof _token).toBe('string')
                        done()
                    })
                })
            })
        })

        it('should fail on invalid token', done => {
            addCardToSale(card, token + '-wrong', (error, response) => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('invalid token')
                expect(response).toBeUndefined()

                done()
            })
        })

        afterEach((done) => {
            call('https://skylabcoders.herokuapp.com/api/v2/users', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                body: JSON.stringify({username, password})
            }, (error, response) => {

                if(error) return done(error)

                if (response.content) {
                    const {error} = JSON.parse(response.content)
                    if (error) return done(new Error(error))
                }

                done()
            })
        })
    })     

    it("should fail on non-string token", () => {
        token = 1
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `token ${token} is not a string`)

        token = true
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `token ${token} is not a string`)

        token = []
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `token ${token} is not a string`)

        token = {}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `token ${token} is not a string`)

        token = undefined
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `token ${token} is not a string`)
    })

    it("should fail on non-function callback", () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'
        
        let callback = {}
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = []
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = "characters"
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = Math.random()
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = true
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)
    })

    it("should fail on non-function callback", () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'
        
        let callback = {}
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = []
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = "characters"
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = Math.random()
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = true
        expect(() => addCardToSale(card, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)
    })

    it("should fail on incorrect data property types or content", () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'

        card = {multiverseid: '22'}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `multiverseid ${card.multiverseid} is not a number`)

        // card = {multiverseid: '\t\n\r'}
        // expect(() => addCardToSale(card, token, () => {}))
        // .toThrowError(TypeError, `multiverseid is empty or blank`)

        // card = {multiverseid: ""}
        // expect(() => addCardToSale(card, token, () => {}))
        // .toThrowError(TypeError, `multiverseid is empty or blank`)

        card = {multiverseid: {}}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `multiverseid ${card.multiverseid} is not a number`)

        card = {multiverseid: true}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `multiverseid ${card.multiverseid} is not a number`)

        card = {multiverseid: []}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `multiverseid ${card.multiverseid} is not a number`)

        
        card = {name: 123}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `name ${card.name} is not a string`)

        card = {name: ""}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `name is empty or blank`)

        card = {name: '\t\n\r'}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `name is empty or blank`)

        card = {imageUrl: 123}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `imageUrl ${card.imageUrl} is not a string`)

        card = {imageUrl: ""}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `imageUrl is empty or blank`)

        card = {imageUrl: '\t\n\r'}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `imageUrl is empty or blank`)

        card = {user: 123}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `user ${card.user} is not a string`)

        card = {user: ""}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `user is empty or blank`)

        card = {user: '\t\n\r'}
        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(TypeError, `user is empty or blank`)
    })

    it("should fail on non-familiar property", () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'

        const property = 'hello'
        card = {[property]: 'world'}

        expect(() => addCardToSale(card, token, () => {}))
        .toThrowError(Error, `property ${property} is not allowed`)
    })

})