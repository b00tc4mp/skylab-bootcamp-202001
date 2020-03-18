import React from 'react'
import Feedback from './Feedback'

export default ({onGoToLogin, onGoToLanding, onSubmit, error}) => {
    
    return <div className="p1 register">
    <form className="form" onSubmit={event => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onSubmit(username, password)
    }}>
        <h1 onClick={event => {
            event.preventDefault()
            onGoToLanding()
        }}>Simonline</h1>
        <h2>Register</h2>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>Register</button>
        <span onClick={event => {
            event.preventDefault()
            onGoToLogin()
        }}>Login</span>

        {error && <Feedback error={error}/>}
    </form>
    </div>
}