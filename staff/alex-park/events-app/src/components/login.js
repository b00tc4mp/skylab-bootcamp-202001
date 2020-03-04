import React from 'react'
import Feedback from './feedback'

function Login({ onToRegister, onSubmit, error }) {
    return <div className='login-container'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value

            onSubmit(email, password)
        }}>
            <input type='text' name='email' placeholder='example@mail.com'></input>
            <input type='password' name='password' placeholder='password'></input>
            {error && <Feedback message={error}/>}
            <button>Login</button>
        </form>
        <a href='#' onClick={event => {
            event.preventDefault()
            onToRegister()
        }}>Go to Register</a>
    </div>
}

export default Login