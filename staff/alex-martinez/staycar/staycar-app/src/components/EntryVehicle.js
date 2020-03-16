import React from 'react'
import './style/EntryVehicle.sass'
import Feedback from './Feedback'

export default function({onSubmit, error}) {

    const handleVehicle = (event) => {
        event.preventDefault()
        const { target: {
            plateNumber: {value: plateNumber}
        } } = event

        onSubmit(plateNumber)
    }

    return <section className="entry-plate">
    <h1 className="entry-plate__title">Entry: vehicle plate number</h1>
    <form className="entry-plate__form" onSubmit={handleVehicle}>
        <input type="text" name="plateNumber" placeholder="entry car plate number" className="entry-plate__input" />
        <button className="entry-plate__submit">Add</button>
    </form>
    {error && <Feedback message={error} level="warn" />}
</section>
}