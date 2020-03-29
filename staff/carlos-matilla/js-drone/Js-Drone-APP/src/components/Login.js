import React, { useEffect } from 'react'
import './Login.sass'
import Feedback from './Feedback'
import drone from './drone.svg'

export default function ({ onSubmit, onGoToRegister, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            username: { value: username },
            password: { value: password }
        } } = event

        onSubmit(username, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    return <>
        <form className="login" onSubmit={handleSubmit}>
            <img src={drone} className="form_logo" alt="logo" />
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button>Login</button>
            {error && <Feedback message={error} level="warn" />}
            <p className="to-register">Go to <a href="" onClick={handleGoToRegister}>Register</a></p>
        </form>
    </>
}