function Footer () {

    return <div className="footer">
        <div className="footer__nav">
            <div className="footer__nav__icons">
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__facebook" href="https://www.facebook.com" target="_blank"><i className="fab fa-facebook-square"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__twitter" href="https://www.twitter.com" target="_blank"><i className="fab fa-twitter-square"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__twitch" href="https://www.twitch.com" target="_blank"><i className="fab fa-twitch"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__youtube" href="https://www.youtube.com" target="_blank"><i className="fab fa-youtube-square"></i></a></div>
                <div className="footer__nav__icons__icon"><a className="footer__nav__icons__icon__instagram" href="https://www.instagram.com" target="_blank"><i className="fab fa-instagram-square"></i></a></div>
            </div>
            <div className="footer__nav__about">About</div>
            <div className="footer__nav__language">
                <label htmlFor="language">Language: </label><select type="select">
                    <option value="english">English</option>
                    <option value="german">German</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="italian">Italian</option>
                    <option value="japanese">Japanese</option>
                    <option value="portugese">Portugese</option>
                    <option value="rusian">Russian</option>
                    <option value="chinese">Chinese</option>

                </select>
            </div>
        </div>
        <p>© 2020. Mtg. All Rights Reserved.</p>
    </div>
}