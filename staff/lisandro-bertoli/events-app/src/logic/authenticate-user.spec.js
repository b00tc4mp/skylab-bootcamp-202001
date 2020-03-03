import authenticateUser from './authenticate-user'

describe('authenticateUser', () => {
    let name, surname, email, password
    debugger
    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = `${Math.random()}@mail.com`
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {
        beforeEach(() =>
            fetch(`https://localhost:8080/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, email, password })
            })
                .then(response => response.json()
                    .then(result => {

                        const { error } = result

                        if (error) throw new Error(error)

                    })
                )
        )

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
                .then(token => {
                    expect(typeof token).toBe('string')

                    const [header, payload, signature] = token.split('.')
                    expect(header.length).toBeGreaterThan(0)
                    expect(payload.length).toBeGreaterThan(0)
                    expect(signature.length).toBeGreaterThan(0)
                })
        )

        it('should fail on incorrect password', () => {
            authenticateUser(email, `${password}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('email and/or password wrong')
                })
        })

        it('should fail on incorrect email', () => {
            authenticateUser(`${email}-wrong`, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('email and/or password wrong')

                })
        })

        // afterEach(() => {
        //     return fetch(`https://localhost:8080/users/auth`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ email, password })
        //     })
        //         .then(response => {


        //             const { error: _error, token } = JSON.parse(response.content)

        //             if (_error) throw new Error(_error)

        //             return fetch(`https://localhost:8080/users`, {
        //                 method: 'DELETE',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Authorization': `Bearer ${token}`
        //                 },
        //                 body: JSON.stringify({ password })
        //             })
        //                 .then(response => {
        //                     if (response.content) {
        //                         const { error } = JSON.parse(response.content)

        //                         if (error) throw new Error(error)
        //                     }
        //                 })
        //         })
        // })
    })

})