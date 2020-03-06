import React from 'react'
import Feedback from './Feedback'

export default ({onSubmit, setView, error}) => {
    return (
        <form onSubmit = { (event) =>{
            event.preventDefault()

            const { email, password } = event.target

            onSubmit(email.value, password.value)
        }}>
            <input type="text" placeholder="email" name="email"/>
            <input type="password" placeholder="password" name="password"/>
            <button>Login</button>


            <a href="" onClick={event => {
                event.preventDefault()

                setView('register')
            }}>Register</a>
           
            {error && <Feedback message={error} level="warn" />}
        </form>
        
    )
}