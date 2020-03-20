import React from 'react';
import authenticateUser from '../../logic/authenticate-user'
import './login.sass';

export default function (props){
    
    const handleOnSubmit = (event) => {
        event.preventDefault()
        
        const usernameValue = event.target.username.value
        const passwordValue = event.target.password.value
    
     handleLogin(usernameValue, passwordValue)

    }

    const handleOnToRegister = (event) => {
        event.preventDefault()
        console.log(props)
        props.history.push('/register')
    }

    const handleLogin = (email, password) => {
        authenticateUser(email, password)
        .then(function( response ){
            if(response === 'ok') {
                props.history.push('/home')
            }else{
                console.log(response.error)
            }
        })
    }
    
    return <form className="login" onSubmit={handleOnSubmit}>
        <h2>ACCOUNT LOGIN</h2>

        {/* <label>Email</label> */}
        <input type="text" name="username" placeholder="username" />

        {/* <label>Password</label> */}
        <input type="password" name="password" placeholder="password" />

        <button >Login</button>

        <a href="" onClick={handleOnToRegister}>Register</a>

    </form>
}

// export default Login;