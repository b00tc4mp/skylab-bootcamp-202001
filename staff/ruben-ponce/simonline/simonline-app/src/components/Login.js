import'./Login.sass'
import React from 'react'
import Feedback from './Feedback'

export default ({onSubmit, onGoToLanding, error}) => {

    return <div className="p1 login">
        <h1 onClick={event => {
            event.preventDefault()
            onGoToLanding()
        }}>Simonline</h1>
        <h2 className="login__title">Login</h2>
        <form className="login__form" onSubmit={event => {
            event.preventDefault()
            onSubmit(event.target.username.value, event.target.password.value)
        }}>
            <input className="login__form__username" type="text" placeholder="username" name="username"/>
            <input className="login__form__password" type="password" placeholder="password" name="password"/>
            <button>Login</button>
        {error && <Feedback error={error}/>}
        </form>
    </div>
}