function Header ({goToResults, goHome, loggedIn, goToLogin, toggleMenu, showNav, goToWatchlist, goToEditProfile, goToLogout, user}) {

    return <header className="header">
        <div className="header__top">
            <img className="logo" src="images/totoro.svg" onClick={goHome}/>

            {!loggedIn ? <LoginButton goToLogin={goToLogin}/> : <UserButton showNav={showNav} toggleMenu={toggleMenu} watchlist={goToWatchlist} editProfile={goToEditProfile} logOut={goToLogout} user={user}/>}

        </div>
            <div className="search">
                <form onSubmit={goToResults}>
                    <img className="search__icon" src="images/search-solid.svg" onClick={goToResults}/>
                    <input className="search__input" type="text"/>
                </form>
            </div>
    </header>
}