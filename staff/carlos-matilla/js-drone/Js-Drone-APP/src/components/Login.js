import React, { useEffect } from 'react'
import './Login.sass'
import Feedback from './Feedback'

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
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <button>Login</button>
            {error && <Feedback message={error} level="warn" />}
            <p>Go to <a href="" onClick={handleGoToRegister}>register</a></p>
        </form>
    </>
}