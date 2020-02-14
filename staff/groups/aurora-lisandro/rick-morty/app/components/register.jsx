function Register({ onSubmit, onToLogin, error }) {
    return <form className="register" onSubmit={event => {
        event.preventDefault()

        const { name, surname, username, password } = event.target

        onSubmit(name.value, surname.value, username.value, password.value)
    }}>
        <h2 className="register__title">Sign-Up</h2>

        <input type="text" className="register__input" name="name" placeholder="Name" />
        <input type="text" className="register__input" name="surname" placeholder="Surname" />
        <input type="text" className="register__input" name="username" placeholder="Username" />
        <input type="text" className="register__input" name="password" placeholder="Password" />

        <button className="register__button" type="submit">Register</button>

        {error && <Feedback level="error" message={error} />}

        <a href="" className="register__link" onClick={() => {
            event.preventDefault()

            onToLogin()
        }}>Already a user? Sing-in!</a>
    </form>
}