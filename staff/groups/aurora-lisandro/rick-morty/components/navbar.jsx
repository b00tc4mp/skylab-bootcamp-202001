function Navbar({ onLogout, onToFavs, onToCharacters, onToEpisodes, onToProfile, title }) {



    return <nav className="nav">
        <div className="nav__left-container">
            <a href="" className="nav__menu" onClick={event => {
                event.preventDefault()
                let menu = document.querySelector(".nav__options")
                if (menu.style.display === "flex") {
                    menu.style.display = "none"
                } else {
                    menu.style.display = "flex"
                }
            }}><i className="fas fa-bars"></i></a>
            {title && <h6>{title}</h6>}
            <div className="nav__options">
                <a href="characters" className="nav__link" onClick={event => {
                    event.preventDefault()

                    onToCharacters()
                }}>Search characters</a>
                <a href="episodes" className="nav__link" onClick={event => {
                    event.preventDefault()

                    onToEpisodes()
                }}>Search episodes</a>
                <a href="" className="nav__link" onClick={event => {
                    event.preventDefault()

                    onToFavs()
                }}>Favorites</a>
                <button className="nav__logout" onClick={event => {
                    event.preventDefault()

                    onLogout()
                }}><i className="fas fa-sign-out-alt"></i></button>
            </div>
        </div>
        <div className="nav__right-container">
            <button className="nav__user" onClick={event => {
                event.preventDefault()
                onToProfile()
            }}><i className="fas fa-user"></i></button>
        </div>
    </nav>
}