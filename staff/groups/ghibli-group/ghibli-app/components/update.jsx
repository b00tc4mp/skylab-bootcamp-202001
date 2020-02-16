function EditProfile({onSubmit, onSubmitDelete, error, message}) {
    return(
        <section className="edit">
            <h2 className="edit__title">Edit profile</h2>
            <div className="edit-category">
                <div className="line"></div>
                <h3 className="category">New Username</h3>
                <div className="line"></div>
            </div>
            <form className="form" onSubmit={event => {
                event.preventDefault()

                const username = event.target.username.value

                onSubmit({username})
            }}>
                <input className="input" name="username" placeholder="New Username"/>
                <button className="submit" type="submit">SAVE</button>

                {error && <span className="message">{error}</span>}

                {message && <span className="message">{message}</span>}

            </form>
            <div className="edit__password">
                <div className="edit-category">
                    <div className="line"></div>
                    <h3 className="category">Password</h3>
                    <div className="line"></div>
                </div>
                <form className="form" onSubmit={event => {
                    event.preventDefault()
                    
                    const oldPassword = event.target.oldPassword.value
                    const password = event.target.password.value

                    onSubmit({oldPassword, password})
                 }}>
                    <input className="input" type="password" name="oldPassword" placeholder="Old password"/>
                    <input className="input" type="password" name="password"  placeholder="New password"/>
                    <button className="submit" type="submit">SAVE</button>

                    {error && <span className="message">{error}</span>}

                    {message && <span className="message">{message}</span>}

                </form>
            </div>
            <div className="edit__name">
                <div className="edit-category">
                    <div className="line"></div>
                    <h3 className="category">Name</h3>
                    <div className="line"></div>
                </div>
                <form className="form" onSubmit={event => {
                    event.preventDefault()

                    const name = event.target.name.value

                    onSubmit({name})
                }}>
                    <input className="input" name="name" placeholder="New Name"/>                    
                    <button className="submit" type="submit">SAVE</button>

                    {error && <span className="message">{error}</span>}

                    {message && <span className="message">{message}</span>}

                </form>
            </div>
            <div className="edit__email">
                <div className="edit-category">
                    <div className="line"></div>
                    <h3 className="category">E-mail</h3>
                    <div className="line"></div>
                </div>
                <form className="form" onSubmit={event => {
                    event.preventDefault()

                    const email = event.target.email.value

                    onSubmit({email})
                }}>
                    <input className="input" name="email" placeholder="New E-mail"/>                    
                    <button className="submit" type="submit">SAVE</button>

                    {error && <span className="message">{error}</span>}

                    {message && <span className="message">{message}</span>}

                </form>
            </div>

            <div className="edit__password">
                <div className="edit-category">
                    <div className="line"></div>
                    <h3 className="category">Delete profile</h3>
                    <div className="line"></div>
                </div>
                <form className="form" onSubmit={event => {
                    event.preventDefault()

                    const password = event.target.password.value

                    onSubmitDelete(password)
                 }}>
                    <input className="input" type="password" name="password"  placeholder="Password"/>

                    {error && <span className="message">{error}</span>}

                    {message && <span className="message">{message}</span>}

                    <button className="delete" type="submit">DELETE</button>

                </form>
            </div>
       </section>
    )
}