import React from 'react'
import logo from './logo.svg';
// import Feedback from './Feedback'

function Landing({onSubmit, goToRegister, error}) {

    return <div className="App">
    <header className="App-header">
    <h1>Simonline</h1>
    <img src={logo} className="App-logo" alt="logo" />
    <a href="#">Login</a>
    <a href="#">Register</a>
    </header>
    </div> 
}

export default Landing

{/* */}

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