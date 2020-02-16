function UserNav (props) {
    return <div className="user-nav__list">
        <a className="option" onClick={() => props.watchlist()}>WATCHLIST</a>
        <a className="option" onClick={() => props.editProfile()}>EDIT PROFILE</a>
        <a className="option" onClick={() => props.logout()}>LOGOUT</a>
    </div>
}