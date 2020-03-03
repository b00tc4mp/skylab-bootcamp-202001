import React from 'react'

export default ({onSubmit}) => {
    return (
        <form onSubmit = { (event) =>{
            event.preventDefault()

            const { email, password } = event.target

            onSubmit(email.value, password.value)
        }}>
            <input type="text" placeholder="email" name="email"/>
            <input type="password" placeholder="password" name="password"/>
            <button>Login</button>
            
        </form>
        
    )
}