import React from 'react'
import Feedback from '../components/Feedback'

const Register = ({ onSubmit, error }) => {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const { email, password } = event.target

        onSubmit(email.value, password.value)
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <input type="text" name="email" placeholder="email@example.com" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
        {error && <Feedback message={error} />}
    </form>
}

export default Register