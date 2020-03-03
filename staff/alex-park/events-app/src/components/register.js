import React from 'react'

function Register({ onSubmit, onToLogin }) {
    return <div className='register-container'>
        <h2>Register</h2>
        <form className='register-form' onSubmit={event => {
            event.preventDefault()

            let name, surname, email, password
            name = event.target.name.value
            surname = event.target.surname.value
            email = event.target.email.value
            password = event.target.password.value

            onSubmit(name, surname, email, password)
        }}>
            <input type='text' name='name' placeholder='Name'></input>
            <input type='text' name='surname' placeholder='Surname'></input>
            <input type='text' name='email' placeholder='example@gmai.com'></input>
            <input type='password' name='password' placeholder='Password'></input>
            <button>Submit</button>
        </form>

        <a href='' onClick={event => {
            event.preventDefault()

            onToLogin()
        }}>Go to Login</a>
    </div>
}

export default Register