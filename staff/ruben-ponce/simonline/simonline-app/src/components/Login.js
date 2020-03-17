import React from 'react'
// import Feedback from './Feedback'

function Login({onSubmit, goToRegister, error}) {

    return <div className="p1 login">
        <p className="login__title">Login</p>
        <form className="login__form" onSubmit={event => {
            event.preventDefault()
            onSubmit(event.target.username.value, event.target.password.value)
        }}>
            <input className="login__form__username" type="text" placeholder="username" name="username"/>
            <input className="login__form__password" type="password" placeholder="password" name="password"/>
            <button>Login</button>
        </form>
        <a onClick={event => {
            event.preventDefault()
            goToRegister()
        }}>Register</a>
        {/* {error && <Feedback error={error}/>} */}
    </div>
}

export default Login

{/* <div className="p1 landing">
    <p className="landing__title">Simonline</p>
    <img src={logo} className="landing__img" alt="logo" />
    <a href="#" className="landing__login">Login</a>
    <a href="#" className="landing__register">Register</a>
    </div>  */}