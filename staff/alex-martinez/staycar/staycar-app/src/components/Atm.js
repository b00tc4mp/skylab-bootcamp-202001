import React from 'react'
import { ValidateTicket } from '.'
import './Atm.sass'

export default function() {

    return <section className="atm">
    <h1 className="atm__title">ATM</h1>
    <form action="" method="" className="atm__form">
        <input type="text" placeholder="car plate" className="atm__input"/>
        <button className="atm__submit">Entry Ticket</button>
    </form>
</section>
}