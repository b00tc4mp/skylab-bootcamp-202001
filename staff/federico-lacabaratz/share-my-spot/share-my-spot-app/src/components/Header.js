import React, { useState } from 'react'
import './Header.sass'
import logo from '../images/logo.png'

export default () => {

    const [menu, setMenu] = useState(false)

    const handleOpenNav = (event) => {
        event.preventDefault()
       menu ? setMenu(false): setMenu(true)
    }

    return <header className="header">
        <nav className="navbar">
            <ul className="navbar__ul">
                <li><a className="burger fas fa-bars" onClick={handleOpenNav}></a></li>
                <li><a><img className="header__logo-img" src={logo} alt="ShareMySpotLogo" /></a></li>
                <li className="navbar__social">
                    <a className="header__account-logout fas fa-power-off"></a>
                    <a className="header__account-user fas fa-user"></a>
                </li>
            </ul>
            <div className={menu ? "sidemenu active" : "sidemenu"}>
                <ul>
                <li><a className="textMenu" >New Search</a></li>
                <li><a className="textMenu" >Add A Spot</a></li>
                <li><a className="textMenu" >Your Spots</a></li>
                <li><a className="textMenu" >Manage Your Requests</a></li>
                <li><a className="textMenu" >Your Bookings</a></li>
                </ul>
            </div>
        </nav>
    </header>

}

        {/* // <div className='sidepanel'>
        //     <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">X</a>
        //     <a href="#">New Search</a>
        //     <a href="#">Add a Listing</a>
        //     <a href="#">Your Listings</a>
        //     <a href="#">Manage Your Requests</a>
        //     <a href="#">Your Bookings</a>
        //     <a href="#">Your Favourites</a>
        // </div>
        // <i onclick={handleOpenNav} className="openbtn fas fa-bars"></i>
        // {/* <script>
        //     {function openNav() {
        //         document.getElementById("mySidepanel").style.width = "250px"
        //     },

        //     function closeNav() {
        //         document.getElementById("mySidepanel").style.width = "0"
        //     }}
        //     </script> */}
        {/* // <div className="header__logo">
        //     <img className="header__logo__img" src={logo} alt="ShareMySpotLogo" />
        // </div>
        // <div className="header__account">
        //     <i className="header__account__logout fas fa-power-off"></i>
        //     <i className="header__account__user fas fa-user"></i>
        // </div> */}