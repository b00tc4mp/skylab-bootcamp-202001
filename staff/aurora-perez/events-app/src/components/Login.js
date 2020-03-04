import React from 'react'

export default ({onSubmit, setView}) => {
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
           
        </form>
        
    )
}