function EditProfile () {
    return <section className="edit">
    <h2 className="edit__title">Edit profile</h2>
    <div className="edit__username">
        <div className="edit-category">
            <div className="line"></div>
            <h3 className="category">Username</h3>
            <div className="line"></div>
        </div>
        <form className="form">
            <input className="input" type="text" placeholder="username"/>
            <button className="submit" type="submit">SAVE</button>
        </form>
    </div>

    <div className="edit__password">
        <div className="edit-category">
            <div className="line"></div>
            <h3 className="category">Password</h3>
            <div className="line"></div>
        </div>
        <form className="form">
            <input className="input" type="text" placeholder="password"/>
            <button className="submit" type="submit">SAVE</button>
        </form>
    </div>

    <div className="edit__name">
        <div className="edit-category">
            <div className="line"></div>
            <h3 className="category">Name</h3>
            <div className="line"></div>
        </div>
        <form className="form">
            <input className="input" type="text" placeholder="name"/>
            <button className="submit" type="submit">SAVE</button>
        </form>
    </div>

    <div className="edit__email">
        <div className="edit-category">
            <div className="line"></div>
            <h3 className="category">Email</h3>
            <div className="line"></div>
        </div>
        <form className="form">
            <input className="input" type="text" placeholder="email"/>
            <button className="submit" type="submit">SAVE</button>
        </form>
    </div>

    <button className="button">Delete Profile</button>
    
</section>
}