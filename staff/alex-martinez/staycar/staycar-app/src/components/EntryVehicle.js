import React, { useState } from 'react'
import './style/EntryVehicle.sass'
import Feedback from './Feedback'
import { useQrEncode } from 'react-qr-hooks'
const { random } = Math


export default function({onSubmit, error}) {

    const [plate, setPlate] = useState('')
    const [id, setId] = useState()

    const handleVehicle = (event) => {
        event.preventDefault()

        const { target: {
            plateNumber: {value: plateNumber},
            ticketId: {value : ticketId}
        } } = event

        setPlate(plateNumber)
        
        setId(ticketId)

        onSubmit(plateNumber, ticketId)
    }

    const encoded = useQrEncode(id)


    return <section className="entry-plate">
    {plate && id && !error ? <img src={encoded} className="qr" alt="qr-code"/> : <>
    <h1 className="entry-plate__title">Entrance</h1>
    <form className="entry-plate__form" onSubmit={handleVehicle}>
        <input type="text" name="plateNumber" placeholder="car plate number" className="entry-plate__input" />
        <input type="hidden" name="ticketId" value={random()}/>

        
        <button className="entry-plate__submit">Add</button>
    </form>
    </>
    }
        {error && <div className="error-container"> <Feedback message={error} level="error" /> </div>}

    </section>
}