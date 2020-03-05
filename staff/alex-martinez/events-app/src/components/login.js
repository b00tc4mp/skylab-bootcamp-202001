import React from 'react'

const Register = ({ onSubmit }) => {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const { email, password } = event.target

        onSubmit(email.value, password.value)
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <input type="text" name="email" placeholder="email@example.com" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
}

export default Register