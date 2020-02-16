function Register({onSubmit, handleGoToLogin, error}) {
    return(
        <form className="register" onSubmit={event => {
            event.preventDefault()
            
            const name = event.target.name.value
            const surname = event.target.surname.value
            const username = event.target.username.value
            const password = event.target.password.value

            onSubmit(name, surname, username, password)
        
        }}>
            <h2>Sign-Up</h2>
            <input name="name" placeholder="name"/>
            <input name="surname" placeholder="surname"/>
            <input name="username" placeholder="username"/>
            <input name="password" placeholder="password" type="password"/>
            <button>Register</button>

            {error && <span>{error}</span>}
            
            <a onClick={event => {
                event.preventDefault()
                handleGoToLogin()
            }}>Login</a>
        </form>
    )
}