import React from 'react'
import './ExitCar.sass'


export default function() {

    return <section className="exit-plate">
    <h1 className="exit-plate__title">Exit: car plate number</h1>
    <form action="" method="" className="exit-plate__form">
        <input type="text" placeholder="exit car plate number" className="exit-plate__input" />
        <button className="exit-plate__submit">Add</button>
    </form>
</section>
}