import React from 'react'
import logo from '../images/logo.png'
import './Register.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, error, setView }) {
    function handleOnSubmit(event) {
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

        setView('login')
    }

    return <>
        <form className="register" onSubmit={handleOnSubmit}>
        <img className="register__logo" src={logo} alt="ShareMySpotLogo" />
        <h2 className="register__title">Sign-Up</h2>
        <input className="register__input" type="text" name="name" placeholder="name" />
        <input className="register__input" type="text" name="surname" placeholder="surname" />
        <input className="register__input" type="text" name="email" placeholder="email" />
        <input className="register__input" type="password" name="password" placeholder="password" />
        <button className="register__submit">Register</button>
        <a className="register__login" href="" onClick={handleGoToLogin}>Already registered? - Go To Login</a>
            {error && <Feedback message={error} level="warn" />}
        </form>
    </>
}