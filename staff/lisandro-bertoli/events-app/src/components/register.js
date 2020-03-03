import React from 'react'
import { registerUser } from '../logic'

const Register = ({ onToLogin }) => {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const { name, surname, email, password } = event.target

        registerUser(name.value, surname.value, email.value, password.value)
            .then(() => onToLogin('login'))
            .catch(error => console.log(error))
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="surname" placeholder="Surname" />
        <input type="text" name="email" placeholder="email@example.com" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>

    </form>
}

export default Register