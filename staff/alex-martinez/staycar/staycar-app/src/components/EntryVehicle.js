import React, { useState } from 'react'
import './style/EntryVehicle.sass'
import Feedback from './Feedback'
import { useQrEncode, useQrDecode } from 'react-qr-hooks'

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
    {plate ? <img src={encoded} className="qr" alt="qr-code"/> : <>
    <h1 className="entry-plate__title">Entry: vehicle plate number</h1>
    <form className="entry-plate__form" onSubmit={handleVehicle}>
        <input type="text" name="plateNumber" placeholder="entry car plate number" className="entry-plate__input" />
        <button className="entry-plate__submit">Add</button>
    </form>
    </>
    }
    {error && <Feedback message={error} level="warn" />}

    {/* {plate ? <img src={encoded} className="qr" alt="qr-code"/> : ''} */}

</section>
}