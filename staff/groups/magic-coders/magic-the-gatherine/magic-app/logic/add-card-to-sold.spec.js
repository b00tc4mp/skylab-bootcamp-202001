describe('addCardToSold', () => {

    let name, surname, phone, email, username, password, token, id

    beforeEach(() => {
        name = 'vam' + Math.random()
        surname = 'vam' + Math.random()
        phone = 'vam' + Math.random()
        email = 'vam@' + Math.random() + '.com'
        username = 'vam' + Math.random()
        password = 'vam' + Math.random()
        const multiverseid = Math.random()
        card = {multiverseid, name: 'v', imageUrl: 'https://image.jpg', user: 'vic'}
        id = multiverseid
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

        it('should add card in sold and remove it in toSale', done => {

            addCardToSale(card, token, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBe('update successful!')

                call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }, (error, response) => {
                    if (error) return callback(error)
                    const user = JSON.parse(response.content), {error: _error} = user
                    if (_error) return callback(new Error(_error))

                    //Logic
                    let {sold, toSale} = user
                    const card = toSale.filter(card => card.multiverseid === id)

                    expect(card[0].multiverseid).toBe(id)

                    toSale = toSale.filter(card => card.multiverseid !== id)

                    if (!sold) {
                        sold = card
                    } else {
                        sold.push(card[0])
                    }

                    call('https://skylabcoders.herokuapp.com/api/v2/users', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({toSale, sold})
                    }, (error, response) => {
                        if (error) return done(error)

                        if (response.status === 204) {
                            
                            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                            }, (error, response) => {
                                if (error) return callback(error)
                                const user = JSON.parse(response.content), {error: _error} = user
                                if (_error) return callback(new Error(_error))

                                expect(user.sold[0].multiverseid).toBe(id)

                                done()
                            })

                        } 
                    })
                })
            })
        })

        afterEach(done => {
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

    it("should fail on non-number id", () => {
        let id = "string"
        expect(() => addCardToSold(id, token, () => {}))
        .toThrowError(TypeError, `id ${id} is not a number`)

        id = true
        expect(() => addCardToSold(id, token, () => {}))
        .toThrowError(TypeError, `id ${id} is not a number`)

        id = []
        expect(() => addCardToSold(id, token, () => {}))
        .toThrowError(TypeError, `id ${id} is not a number`)

        id = {}
        expect(() => addCardToSold(id, token, () => {}))
        .toThrowError(TypeError, `id ${id} is not a number`)

        id = undefined
        expect(() => addCardToSold(id, token, () => {}))
        .toThrowError(TypeError, `id ${id} is not a number`)
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
        expect(() => addCardToSold(id, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = []
        expect(() => addCardToSold(id, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = "characters"
        expect(() => addCardToSold(id, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = Math.random()
        expect(() => addCardToSold(id, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)

        callback = true
        expect(() => addCardToSold(id, token, callback))
        .toThrowError(TypeError, `callback ${callback} is not a function`)
    })


})