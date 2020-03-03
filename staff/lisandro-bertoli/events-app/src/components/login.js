import React from 'react'
import { authenticateUser } from '../logic'

const Register = ({ onToLogin }) => {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const { email, password } = event.target

        authenticateUser(email.value, password.value)
            .then(() => onToLogin('home'))
            .catch(error => console.log(error))
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <input type="text" name="email" placeholder="email@example.com" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
    </form>
}

export default Register