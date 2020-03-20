import React from 'react';
import register from '../../logic/register'
import './register.sass';

function Register(props) {

    const handleOnSubmit = (event) => {
        event.preventDefault()
        
        const name = event.target.name.value
        const surname = event.target.surname.value
        const username = event.target.username.value
        const password = event.target.password.value

        handleRegister(name, surname, username, password)
    }

    const handleOnToLogin = (event) => {
        event.preventDefault()
        console.log(props)
        props.history.push('/')
    }

    const handleRegister = (name, surname, username, password) => {
        register(name, surname, username, password)
        .then(function( response ){
            if(response === 'ok') {
                props.history.push('/')
            }else{
                console.log(response.error, 'register error')
            }
        })
    }

    return <form className="register" onSubmit={handleOnSubmit}>
        <h2>Sign-up</h2>
        {/* <div className="register__inputs">
            <label>NAME</label> */}
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="surname" placeholder="surname" />
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
        {/* </div> */}
        <button>Register</button>
        <a href="" onClick={handleOnToLogin}>Login</a>
    </form>
}

export default Register;