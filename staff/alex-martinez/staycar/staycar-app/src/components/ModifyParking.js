import React from 'react'
import './style/ModifyParking.sass'

import {Feedback} from '.'


export default ({onSubmit, error}) => {


    const handleSubmit = (event) => {

        event.preventDefault()
        const { target: {
            parkingName: { value: parkingName },
            rate: { value: rate },
            totalLots: { value: totalLots}
        } } = event

        onSubmit(parkingName, parseFloat(rate), parseFloat(totalLots))
    }
   
    return <section className="modify-parking">
    <div className="modify-parking__head">
        <h1 className="modify-parking__title">Modify Parking:</h1>
    </div>
    <form className="modify-parking__form" onSubmit={handleSubmit}>
        <input type="text" name="parkingName" placeholder="parking name" className="modify-parking__input" />
        <input type="text" name="rate" placeholder="rate" className="modify-parking__input" />
        <input type="text" name="totalLots" placeholder="total lots" className="modify-parking__input" />
        <button className="modify-parking__submit">Update</button>
    </form>
    
    {error && <Feedback message={error} level="error" />}
    </section>
}