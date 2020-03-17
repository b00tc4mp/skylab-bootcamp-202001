// const { validate } = require('simonline-utils')

export default async function (token) {
    // validate.string(token, 'token')

    const retrieve = await fetch(`http://localhost:8085/api/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })

    const res = await retrieve.text()
    const user = await res

    if(user.error) return new Error(user.error)

    else return JSON.parse(user)

}