import React from 'react'

export default ({onSubmit, setView}) => {
    return (
        <form onSubmit = { (event) =>{
            event.preventDefault()

            const { name, surname, email, password } = event.target

            onSubmit(name.value, surname.value, email.value, password.value)
        }}>
            <input type="text" placeholder="name" name="name"/>
            <input type="text" placeholder="surname" name="surname"/>
            <input type="text" placeholder="email" name="email"/>
            <input type="password" placeholder="password" name="password"/>
            <button>Register</button>
            <a href="" onClick={event => {
                event.preventDefault()

                setView('login')
            }}>Login</a>
            </form>
        
    )
}

