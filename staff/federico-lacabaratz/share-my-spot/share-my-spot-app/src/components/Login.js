import React from 'react'
import logo from '../images/logo.png'
import './Login.sass'
import Feedback from './Feedback'
import { withRouter} from 'react-router-dom'

export default withRouter (function ({ onLogin, history, error }) {
    function handleOnLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        onLogin(email, password)
    }

    const handleGoToRegister = (event) => {
        event.preventDefault()
        
        history.push('/register')
    }

    /* function handleGoToRegister(event) {
        event.preventDefault()

        history.push('/register')
    } */

    return <>
        <form className="login" onSubmit={handleOnLogin}>
            <img className="login__logo" src={logo} alt="ShareMySpotLogo" />
            <h2 className="login__title">Sign-In</h2>
            <input className="login__input" type="text" name="email" placeholder="email" />
            <input className="login__input" type="password" name="password" placeholder="password" />
            <button className="login__submit">Login</button>
            <a className="login__register" href="" onClick={handleGoToRegister}>Not registered yet? - Go To Register</a>
            {error && <Feedback message={error} level="warn" />}
        </form>
    </>
})