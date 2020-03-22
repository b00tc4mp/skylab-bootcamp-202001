import React from 'react'

export default ({ticket}) => {


debugger
    return <>
        <div class="report__item">
            <p>Ticket id: <span>{ticket.id}</span></p>
            <p>Car plate: <span>{ticket.carPlate}</span></p>
            <p>Validated: <span>{`${ticket.validated}`}</span></p>
        </div>
    </>
}