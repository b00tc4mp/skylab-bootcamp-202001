import axios from 'axios'

export default (email, password) => {
    if (typeof email !== 'string') throw new TypeError(`email ${email} is not a string`)
    if (!email.trim()) throw new Error('email is empty')
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
    if (!password.trim()) throw new Error('password is empty')

    return axios.post('http://localhost:8085/users/auth', {email, password})
    .then(response => response.data.token)
}

