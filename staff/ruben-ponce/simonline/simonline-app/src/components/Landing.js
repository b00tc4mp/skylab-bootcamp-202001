import React from 'react'
import logo from './logo.svg';
import'./Landing.sass'
// import Feedback from './Feedback'

function Landing() {

    return <div className="p1 landing">
    <p className="landing__title">Simonline</p>
    <img src={logo} className="landing__img" alt="logo" />
    <a href="#" className="landing__login">Login</a>
    <a href="#" className="landing__register">Register</a>
    </div> 
}

export default Landing

{/*     <div class="p1 landing">
        <p class="landing__title">Simonline</p>
        <img class="landing__img" src="./logo.svg" alt="logo">
        <a class="landing__login">Login</a>
        <a class="landing__register">Register</a>
    </div> */}

{/* <div>
        <h1>Login</h1>
        <form onSubmit={event => {
            event.preventDefault()
            onSubmit(event.target.email.value, event.target.password.value)
        }}>
            <input type="text" placeholder="email" name="email"/>
            <input type="password" placeholder="password" name="password"/>
            <button>Ok</button>
        </form>
        <span onClick={event => {
            event.preventDefault()
            goToRegister()
        }} >Register</span>
        {error && <Feedback error={error}/>}}
    </div> */}