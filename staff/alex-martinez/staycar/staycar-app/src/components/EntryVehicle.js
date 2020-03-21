import React, { useState, useContext } from 'react'
import { Context } from './ContextProvider'
import './style/EntryVehicle.sass'
import Feedback from './Feedback'
import { useQrEncode } from 'react-qr-hooks'

export default function({onSubmit, error}) {

    const [plate, setPlate] = useState('')

    const handleVehicle = (event) => {
        event.preventDefault()
        
        const { target: {
            plateNumber: {value: plateNumber}
        } } = event

        setPlate(plateNumber)

        onSubmit(plateNumber)
    }

    const encoded = useQrEncode(plate)


    return <section className="entry-plate">
    {plate && !error ? <img src={encoded} className="qr" alt="qr-code"/> : <>
    <h1 className="entry-plate__title">Entrance</h1>
    <form className="entry-plate__form" onSubmit={handleVehicle}>
        <input type="text" name="plateNumber" placeholder="car plate number" className="entry-plate__input" />
        <button className="entry-plate__submit">Add</button>
    </form>
    </>
    }
    {error && <Feedback message={error} level="warn" />}

</section>
}