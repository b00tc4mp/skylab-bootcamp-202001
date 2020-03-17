import React from 'react'
import logo from './logo.svg';
import'./Landing.sass'
// import Feedback from './Feedback'

function Landing({goToRegister, goToLogin}) {

    return <div className="p1 landing">
    <p className="landing__title">Simonline</p>
    <img src={logo} className="landing__img" alt="logo" />
    <p className="landing__login" onClick={event => {
            event.preventDefault()
            goToLogin()}}>Login</p>
    <p className="landing__register" onClick={event => {
            event.preventDefault()
            goToRegister()}}>Register</p>
    </div> 
}

export default Landing