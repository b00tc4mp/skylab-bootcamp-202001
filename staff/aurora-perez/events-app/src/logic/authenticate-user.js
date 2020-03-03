import axios from 'axios'

export default (email, password) => {
    if (!email.trim()) throw new Error('email is empty')
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
    if (!password.trim()) throw new Error('password is empty')

    return axios.post('http://localhost:8085/users/auth', {email, password})
    .then(response => console.log(response.data.token) )
}

