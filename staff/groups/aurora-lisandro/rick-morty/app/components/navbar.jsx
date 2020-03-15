function Navbar({ onLogout, onToFavs, onToCharacters, onToEpisodes, onToProfile, title }) {


    const toggleNavBar = () => { 
        const menu = document.querySelector(".nav__options")
        if (menu.style.display === "flex" && window.visualViewport.width < 768) {
            menu.style.display = "none"
        } else{
            menu.style.display = "flex"

        }

    }

    return <nav className="nav">
        <div className="nav__left-container">
            <a href="" className="nav__menu" onClick={event => {
                event.preventDefault()

                toggleNavBar()
            }}><i className="fas fa-bars"></i></a>
            {title && <h6>{title}</h6>}
            <div className="nav__options">
                <a href="characters" className="nav__link" onClick={event => {
                    event.preventDefault()
                    toggleNavBar()
                    onToCharacters()
                }}>Search characters</a>
                <a href="episodes" className="nav__link" onClick={event => {
                    event.preventDefault()
                    toggleNavBar()
                    onToEpisodes()
                }}>Search episodes</a>
                <a href="" className="nav__link" onClick={event => {
                    event.preventDefault()
                    toggleNavBar()
                    onToFavs()
                }}>Favorites</a>
                <button className="nav__logout" onClick={event => {
                    event.preventDefault()

                    onLogout()
                }}>Logout <i className="fas fa-sign-out-alt"></i></button>
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