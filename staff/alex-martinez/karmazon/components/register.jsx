function Register({onSubmit, goToLogin, error}) {
    return <form>
        <h2>Sign-up</h2>
        
        {error && <Feedback level='error' message={error}/>}

        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="surname" placeholder="surname"/>
        <input type="text" name="username" placeholder="username"/>
        <input type="password" name="password" placeholder="password"/>
        <button onSubmit={event => {
            event.preventDefault()
            onSubmit()
        }}>Register</button>
        <a href="" onClick={event => {
            event.preventDefault()
            goToLogin()}
            }>Login</a>
    </form>
}