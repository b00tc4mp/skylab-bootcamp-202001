function Login({ onSubmit, onToRegister }) {
    return <form className="login" onSubmit={event => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onSubmit(username, password)

    }}>

        <h2 className="login__title">Sign-in</h2>

        <input className="login__input" type="text" name="username" placeholder="username" />
        <input className="login__input" type="password" name="password" placeholder="password" />

        <button className="login__button" type="submit">Login</button>

        <a className="login__link" href="" onClick={event => {
            event.preventDefault()

            onToRegister()
        }}> Are you not register yet? Register!</a>

    </form>

}