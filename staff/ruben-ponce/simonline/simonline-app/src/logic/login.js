 // const {validate} = require('simonline-utils')

export default async function (username, password) {
    // validate.string(username, 'username')
    // validate.string(password, 'password')

    const auth = await fetch(`http://localhost:8085/api/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })

    const res = await auth.json()

    const { token, error } = await res
    
    if (error)
        throw new Error(error)

    else return token
}