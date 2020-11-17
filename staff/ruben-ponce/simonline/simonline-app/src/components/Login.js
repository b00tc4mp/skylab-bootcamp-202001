import'./Login.sass'
import React from 'react'
import Feedback from './Feedback'

export default ({onSubmit, goTo, error}) => {

    return <div className="p1 login">
        <h1 onClick={event => {
            event.preventDefault()
            goTo('landing')
        }}>Simonline</h1>
        <h2>Login</h2>
        <form onSubmit={event => {
            event.preventDefault()
            onSubmit(event.target.username.value, event.target.password.value)
        }}>
            <input type="text" placeholder="username" name="username"/>
            <input type="password" placeholder="password" name="password"/>
            <button>Login</button>
        {error && <Feedback error={error}/>}
        </form>
    </div>
}