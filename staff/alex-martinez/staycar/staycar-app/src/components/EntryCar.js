import React from 'react'
import './EntryCar.sass'


export default function() {

    return <section className="entry-plate">
    <h1 className="entry-plate__title">Entry: car plate number</h1>
    <form action="" method="" className="entry-plate__form">
        <input type="text" placeholder="entry car plate number" className="entry-plate__input" />
        <button className="entry-plate__submit">Add</button>
    </form>
</section>
}