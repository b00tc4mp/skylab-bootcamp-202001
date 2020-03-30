import React, { useEffect }  from 'react'
import { MyBookingItem } from '../components'
import './MyBookings.sass'

export default function ({ myBookingSpots, handleMyBookings }) {

    useEffect(() => {
        handleMyBookings()
    }, [])

    return <ul className="myBookings">
        {myBookingSpots.map(myBookingItem => <MyBookingItem key={myBookingItem.id} myBookingItem={myBookingItem} />)}
    </ul>
}