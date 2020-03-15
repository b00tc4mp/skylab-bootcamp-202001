import React, { useEffect } from 'react'
import './Header.sass'
import Feedback from './Feedback'
import parking from './icons/pk-parking.png'

export default () => {

    return (
    <header>
        <section className="logo">
            <img src={parking} className="logo__icon" alt=""/>
            <p className="logo__text"><a href="#">StayCar</a></p>
        </section>
        <section className="logout">
            <p className="logout__text"><a href="#">Logout</a></p>
        </section>
    </header>
    )
}