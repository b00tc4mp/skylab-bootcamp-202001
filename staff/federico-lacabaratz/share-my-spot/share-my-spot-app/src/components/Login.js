import React from 'react'
import './Login.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, onGoToRegister, error }) {
    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(email, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    return <>
        <form class="login" onSubmit={handleSubmit}>
            <img class="login__logo" src="../images/logo.png" alt="ShareMySpotLogo" />
            <h2 class="login__title">Sign-In</h2>
            <input class="login__input" type="text" placeholder="email" />
            <input class="login__input" type="password" placeholder="password" />
            <button class="login__submit">Login</button>
            <a class="login__register" href="">Not registered yet?{"\n"}Go To Register</a>
            {error && <Feedback message={error} level="warn" />}
            <p>Go to <a href="" onClick={handleGoToRegister}>register</a></p>
        </form>
    </>
}