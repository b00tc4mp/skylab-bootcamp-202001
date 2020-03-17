import React from 'react'
import './Register.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, onGoToLogin, error }) {
    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(name, surname, email, password)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <>
        <form className="register" onSubmit={handleSubmit}>
        <img class="register__logo" src="../images/logo.png" alt="ShareMySpotLogo" />
        <h2 class="register__title">Sign-Up</h2>
        <input class="register__input" type="text" placeholder="name" />
        <input class="register__input" type="text" placeholder="surname" />
        <input class="register__input" type="text" placeholder="email" />
        <input class="register__input" type="password" placeholder="password" />
        <button class="register__submit">Register</button>
        <a class="register__login" href="">Already registered?{"\n"}Go To Login</a>
            {error && <Feedback message={error} level="warn" />}
            <p>Go to <a href="" onClick={handleGoToLogin}>login</a></p>
        </form>
    </>
}