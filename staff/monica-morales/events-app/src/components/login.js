import React from "react"

export default function ({onToLogin, setView}){
    return <form className="login" onSubmit={event=>{
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        onToLogin(email, password)

    }}>
        <h2>Login</h2>
        <input type="text" name="email" placeholder="email"/>
        <input type="password" name="password" placeholder="password"/>
        <button>Login</button>
        <a href="" onClick={event => {
            event.preventDefault()
            
            setView('register')
        }}>register</a>

    </form>
}