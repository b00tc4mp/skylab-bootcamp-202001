import React from 'react'
import logo from '../images/logo.png'
import './Login.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, error, setView }) {
    function handleOnSubmit(event) {
        event.preventDefault()

        const { target: {
            email: { value: email },
            password: { value: password }
        } } = event

        onSubmit(email, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()
        
        setView('register')
    }

    return <>
        <form className="login" onSubmit={handleOnSubmit}>
            <img className="login__logo" src={logo} alt="ShareMySpotLogo" />
            <h2 className="login__title">Sign-In</h2>
            <input className="login__input" type="text" name="email" placeholder="email" />
            <input className="login__input" type="password" name="password" placeholder="password" />
            <button className="login__submit">Login</button>
            <a className="login__register" href="" onClick={handleGoToRegister}>Not registered yet? - Go To Register</a>
            {error && <Feedback message={error} level="warn" />}
        </form>
    </>
}