import React, { Component } from 'react';
import './topBar.sass'

class TopBar extends Component{
            
    handleClick = () => {
        const burger = document.querySelector('.burger')
        const nav = document.querySelector('.navLinks')
        const navButtons = document.querySelectorAll('.navLinks li')

        console.log('this is:', this);
        nav.classList.toggle('nav-active')

        navButtons.forEach( (link, index) => {
            if(link.style.animation){
                link.style.animation = ''
            }else{
                link.style.animation = `navLinksFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })

        burger.classList.toggle('toggle')

    }
    
    render() {

        return(
            <nav>
                <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
                <div className="logo">
                    <h4>CRYPTO-STATE</h4>
                </div>

                <ul className="navLinks">
                    <li>
                        <a href="#">Home</a>
                    </li>

                    <li>
                        <a href="#">About</a>
                    </li>

                    <li>
                        <a href="#">Project</a>
                    </li>

                    <li>
                        <a href="#">Perfil</a>
                    </li>
                </ul>

                <div className="burger" onClick={this.handleClick}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        )
    }
}

export default TopBar;