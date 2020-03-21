import'./Register.sass'
import React from 'react'
import Feedback from './Feedback'

export default ({goTo, onSubmit, error}) => {
    
    return <div className="p1 register">
        <h1 onClick={event => {
            event.preventDefault()
            goTo('landing')
        }}>Simonline</h1>
        <h2>Register</h2>
        <form className="form" onSubmit={event => {
            event.preventDefault()
    
            const username = event.target.username.value
            const password = event.target.password.value
    
            onSubmit(username, password)
        }}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>Register</button>
        {error && <Feedback error={error}/>}
    </form>
    </div>
}