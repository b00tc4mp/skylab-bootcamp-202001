import React from 'react'
// import Feedback from './Feedback'

function Register({goToLogin, onSubmit, error}) {
    
    return <form className="register" onSubmit={event => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onSubmit(username, password)
    }}>
        <h1>Register</h1>

        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>Register</button>
        <span onClick={event => {
            event.preventDefault()

            goToLogin()
        }}>Login</span>

        {/* {error && <Feedback error={error}/>} */}
    </form>

}

export default Register