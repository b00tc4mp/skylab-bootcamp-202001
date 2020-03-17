import React, { useEffect } from 'react'
import Header from './Header'
// import Navbar from './Navbar'
import './Login.sass'
import './Header.sass'
import './Form.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, onGoToRegister, onGoToRememberPassword, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            userMember: { value: userMember },
            password: { value: password }
        } } = event

        onSubmit(userMember, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    function handleGoToRememberPassword(event) {
        event.preventDefault()

        onGoToRememberPassword()
    }

    return <>
        {/* <Navbar/> */}
        <Header/>
        <form className="form loginG" onSubmit={handleSubmit}>
            <label for="userMember" className="form_label">MEMBER NUMBER OR EMAIL</label>
            <input type="text" className="form_input" id="userMember" name="userMember" placeholder="Member Number/Email"/>
            <label for="password" className="form_label">PASSWORD</label>
            <input type="password" className="form_input" id="password" name="password" placeholder="Password"/>
            <button type="submit" className="form_button">SIGN IN</button>
            {error && <Feedback message={error} level="warn" />}
            <a href="" onClick={handleGoToRegister} className="login">NOT A MEMBER?</a>
            <a href="" onClick={handleGoToRememberPassword} className="login">FORGOT YOUR PASSWORD?</a>
        </form>


    
      
        {/* <form className="register" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button>Login</button>
            {error && <Feedback message={error} level="warn" />}
            <p>Go to <a href="" onClick={handleGoToRegister}>register</a></p>
        </form> */}
    </>
}