function Footer ({changeLang}) {

    return <div className="footer">
        
            <div className="footer__nav__icons">
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__facebook" href="https://www.facebook.com/MagicTheGathering.es/" target="_blank"><i className="fab fa-facebook-square"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__twitter" href="https://www.twitter.com" target="_blank"><i className="fab fa-twitter-square"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__twitch" href="https://www.twitch.com" target="_blank"><i className="fab fa-twitch"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__youtube" href="https://www.youtube.com" target="_blank"><i className="fab fa-youtube-square"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__instagram" href="https://www.instagram.com" target="_blank"><i className="fab fa-instagram-square"></i></a></div>
            </div>
            <div className="footer__nav__about">About</div>
            <div className="footer__nav__language">
                <label htmlFor="language"></label>
                <select onChange={changeLang} className="select" type="select">
                    <option>English</option>
                    <option>German</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                    <option>Portugese</option>
                    <option>Russian</option>
                    <option>Chinese</option>

                </select>
            </div>
        
       
    </div>
}