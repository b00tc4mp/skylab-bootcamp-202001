function Register({onSubmit, error}) {

    return <section className="register">
        <form className="form" onSubmit={event => {
            event.preventDefault()
            
            const name = event.target.name.value
            const email = event.target.email.value
            const username = event.target.username.value
            const password = event.target.password.value

            onSubmit(name, email, username, password)
        
        }}>
            <input className="input" type="text" name="name" placeholder="name" required/>
            <input className="input" type="text" name="email" placeholder="email" required/>
            <input className="input" type="text" name="username" placeholder="username" required/>
            <input className="input" type="password" name="password" placeholder="password" required/>
            <button className="submit" type="submit">REGISTER</button>

            {error && <span>{error}</span>}

            <p className="incentive">Register to add your favourite movies to your watchlist!</p>
        </form>
    </section>
}