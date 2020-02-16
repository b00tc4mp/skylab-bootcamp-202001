function Login({onSubmit, handleGoToRegister, error}) {

    return(
        <form className="register" onSubmit={event => {
            event.preventDefault()
            const username = event.target.username.value
            const password = event.target.password.value

            onSubmit(username, password)
        }}>
            <h2>Sign-In</h2>
            <input name="username" placeholder="username"/>
            <input name="password" placeholder="password" type="password"/>
            <button>Login</button>

            {error && <span>{error}</span>}
        
            <a onClick={event => {

                event.preventDefault()
                handleGoToRegister()

            }}>Register</a>

            <a onClick={event => {

            event.preventDefault()
            handleGoToUpdate()

            }}>Edit profile</a>
        </form>
    )
}

{view === "login" && <Login onSubmit={handleLogin} handleGoToRegister={handleGoToRegister} error={error} />}

{view === "register" && <Register onSubmit={handleRegister} handleGoToLogin={handleGoToLogin} error={error} />}





state= {view: 'login', error: undefined, token: undefined, films: undefined, film: undefined}

handleLogin = (username, password) => {
    try{

        authenticateUser(username, password, (error, token)=>{
            if(error){
                this.setState({error: error.message})

                setTimeout(()=>{
                    this.setState({error: undefined})
                },3000)
            }else{
                retrieveUser(token, (error, user) => {
                    if(error){
                        
                        return this.setState({error: error.message})

                    }else{
                        
                        sessionStorage.token = token

                        this.setState({ view: 'search', user })
                    }
                })
            }
        })

    }catch(error){
        this.setState({error: error})
    }
}

handleGoToRegister = () => {this.setState({ view: 'register' })}

handleRegister = (name, surname, username, password) => {

    try{
        registerUser(name, surname, username, password, email, error => {
            if(error){
                this.setState({error: error.message})

                setTimeout(()=>{
                    this.setState({ error: undefined })
                },3000)
            }else{
                this.setState({view: 'login'})
            }
        })
    
    }catch(error){
        this.setState(error)
    }

}

handleGoToLogin = () => {this.setState({ view: 'login' })}