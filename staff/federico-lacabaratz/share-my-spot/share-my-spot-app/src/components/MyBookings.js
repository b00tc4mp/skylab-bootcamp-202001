import React, { useState } from 'react'
import './MyBookings.sass'
const API_URL = process.env.REACT_APP_API_URL

export default function ({ spot }) {

    const [phoneB, setPhoneB] = useState(false)
    const [emailB, setEmailB] = useState(false)
    
    // useEffect retreiveMyBookings() FROM spots WHERE bookingCandidates includes userID || bookedTo = userID
    if (spot) {
        const { title, hourStarts, hourEnds, price, publisherId } = spot
            return < div className="myBookings" >
                <main>
                    <div className="myBookings__container">
                        <h3 className="myBookings__h3">YOU HAVE MADE A RESERVATION:</h3>
                        <p>Your reservation to: {title} from {hourStarts} to {hourEnds} at {price}€/hr is awaiting confirmation from {publisherId.name}.</p><br></br>
                        <p>Please wait up now to hear back from him.</p>
                        <p>In case 24hs go by and you still haven't heard from him, feel free to call or send him an e-mail using the buttons located down below. <br></br><br></br> When/if accepted by the publisher this will serve as your owner's data storage to get in touch with him. <br></br><br></br> In case of being rejected, it will dissapear from your MyBookings</p>
                        <div className="myBookings__bottom">
                            <i className="myBookings__bottom-call fas fa-phone" onClick={e => {
                                e.preventDefault()
                                setPhoneB(!phoneB)
                            }}></i>
                            <div className="myBookings__bottom-phone" >
                                {phoneB && typeof publisherId.phone !== 'undefined' && publisherId.phone}
                                {phoneB && typeof publisherId.phone === 'undefined' && 'No phone available'}
                            </div>
                            <i className="myBookings__bottom-envelope far fa-envelope" onClick={e => {
                                e.preventDefault()
                                setEmailB(!emailB)
                            }}></i>
                            <div className="myBookings__bottom-email" >
                                {emailB && publisherId.email}
                            </div>
                        </div>
                    </div>
                </main>
            </div >
    }
    return null
}