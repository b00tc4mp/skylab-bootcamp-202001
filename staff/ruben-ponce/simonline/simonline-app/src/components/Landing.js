import React from 'react'
import logo from './logo.svg';
import'./Landing.sass'
// import Feedback from './Feedback'

export default ({goRegister, goLogin}) => {

    return <div className="p1 landing">
    <p className="landing__title">Simonline</p>
    <img src={logo} className="landing__img" alt="logo" />
    <p className="landing__login" onClick={event => {
            event.preventDefault()
            goLogin()}}>Login</p>
    <p className="landing__register" onClick={event => {
            event.preventDefault()
            goRegister()}}>Register</p>
    </div> 
}