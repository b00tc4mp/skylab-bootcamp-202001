function UserButton (props) {
    return <div className="user-nav" id="nav">
        <div className="user" onClick={()=> props.showNav(props.toggleMenu)}>
            <span className="login__text">{props.user}</span>
            <div className="line"></div>
        </div>
        {props.toggleMenu===true && <UserNav watchlist={props.watchlist} editProfile={props.editProfile} logOut={props.logOut}/>}
    </div>
}