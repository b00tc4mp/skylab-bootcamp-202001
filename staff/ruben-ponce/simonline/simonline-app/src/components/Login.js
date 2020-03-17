import React from 'react'
// import Feedback from './Feedback'

function Login({onSubmit, goToRegister, goToLanding, error}) {

    return <div className="p1 login">
        <h1 onClick={event => {
            event.preventDefault()
            goToLanding()
        }}>Simonline</h1>
        <h2 className="login__title">Login</h2>
        <form className="login__form" onSubmit={event => {
            event.preventDefault()
            onSubmit(event.target.username.value, event.target.password.value)
        }}>
            <input className="login__form__username" type="text" placeholder="username" name="username"/>
            <input className="login__form__password" type="password" placeholder="password" name="password"/>
            <button>Login</button>
        </form>
        <p onClick={event => {
            event.preventDefault()
            goToRegister()
        }}>Register</p>
        {/* {error && <Feedback error={error}/>} */}
    </div>
}

export default Login