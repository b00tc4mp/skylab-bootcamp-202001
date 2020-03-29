import React from 'react'
import './YourRequest.sass'
const API_URL = process.env.REACT_APP_API_URL

export default function ({ spot = [], user = { }, onToAccept, onToDecline }) {

    const { title } = spot
    const { id, name, surname, email, phone } = user

    // useEffect retreiveBookingRequests() that where booked to = userID

    const handleOnToAccept = (event) => {
        event.preventDefault()
        onToAccept(id)
    }
    
    const handleOnToDecline = (event) => {
        event.preventDefault()

        onToDecline(id)
    }

return <div className="yourRequest">
        <main>
            <div className="yourRequest__container">
                <h3 className="yourRequest__h3">SOMEONE HAS REQUESTED TO BOOK YOUR PARKING SPOT:</h3>
                <p>User: {name} {surname},<br></br><br></br> Email: {email},<br></br> Phone: {phone},<br></br><br></br> Has requested a reservation from your listing: {title}. <br></br><br></br> Please get in touch with him as soon as possible before making a decision on his proposal.</p>
                <div className="yourRequest__bottom">
                    <button className="yourRequest__buttons" onClick={handleOnToAccept} >Accept Request</button>
                    <button className="yourRequest__buttons" onClick={handleOnToDecline}>Decline Request</button>                    
                </div>
            </div>
        </main>
    </div>
}
