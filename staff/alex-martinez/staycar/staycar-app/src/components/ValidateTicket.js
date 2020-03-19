import React from 'react'
import './style/ValidateTicket.sass'

export default function({infoTicket}) {

    return <section className="validate">
    <h1 className="validate__title">Validate Ticket</h1>

    <form action="" method="" className="validate__form">
        <input type="text" name="price" value={infoTicket.amount} className="validate__price"/>
        <button className="validate__submit">Validate</button>
    </form>
</section>
}