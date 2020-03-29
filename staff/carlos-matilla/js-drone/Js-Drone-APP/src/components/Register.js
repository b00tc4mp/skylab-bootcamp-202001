import React, { useEffect } from 'react'
import './Register.sass'
import Feedback from './Feedback'
import drone from './drone.svg'

export default function ({ onSubmit, onGoToLogin, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            password: { value: password }
        } } = event

        onSubmit(name, surname, username, password)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <>
    <form className="register" onSubmit={handleSubmit}>
            <img src={drone} className="form_logo" alt="logo" />
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="surname" placeholder="Surname" />
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button>Register</button>
            {error && <Feedback message={error} level="warn" />}
            <p className="to-register">Go to <a href="" onClick={handleGoToLogin}>Login</a></p>
        </form>
        
        </>
}