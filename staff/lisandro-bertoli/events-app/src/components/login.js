import React from 'react'
import Feedback from '../components/Feedback'

const Register = ({ onSubmit, onToRegister, error }) => {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const { email, password } = event.target

        onSubmit(email.value, password.value)
    }

    const handleOnToRegister = (event) => {
        event.preventDefault()

        onToRegister()
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <input type="text" name="email" placeholder="email@example.com" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
        <a href="#" onClick={handleOnToRegister}>Register</a>
        {error && <Feedback message={error} />}
    </form>
}

export default Register