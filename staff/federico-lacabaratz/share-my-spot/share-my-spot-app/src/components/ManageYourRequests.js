import React from 'react'
import { YourRequest } from '../components'
import './ManageYourRequests.sass'
import YourRequest from './YourRequest'

export default function ({spots, user, onAccept, onDecline}) {
    
    return <ul className="manageRequests">
        {spots.map(spot => <YourRequest key={spot._id} spot={spot} user={user} onToAccept={onAccept} onToDecline={onDecline} />)}
    </ul>
}