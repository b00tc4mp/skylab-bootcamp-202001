import registerUser from './register-user'

describe('registerUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = `${Math.random()}@email.com`
        password = 'password-' + Math.random()
    })

    it('should succeed on new user', () => {
        registerUser(name, surname, email, password)
            .then(response => {

                expect(response).toBeUndefined()
            })
    })

    describe('when user already exists', () => {
        beforeEach(() => {
            return fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, email, password })
            })
                .catch(error => {
                    throw new Error(error)

                })
        })

        it('should fail on already existing user', () => {
            registerUser(name, surname, email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user ${email} already exists`)

                })
        })

        afterEach(() => {
            return fetch(`http://localhost:8080/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
                .then(response => {

                    const { error: _error, token } = JSON.parse(response.content)

                    if (_error) throw new Error(_error)

                    return fetch(`http://localhost:8080/users`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ password })
                    })
                        .then(response => {
                            if (response.content) {
                                const { error } = JSON.parse(response.content)

                                if (error) throw new Error(error)
                            }
                            debugger
                        })
                })
        })
    })

})
