import React, { useEffect, useState } from 'react'
import { YourRequest } from '../components'
import './ManageYourRequests.sass'

export default function ({ yourRequests, handleMyRequests, onAccept, onDecline }) {

    useEffect(() => {
        handleMyRequests()
    }, [])
    
    return <ul className="manageRequests">
        {yourRequests.map(yourRequestItem => <YourRequest key={yourRequestItem.id} yourRequestItem={yourRequestItem} onToAccept={onAccept} onToDecline={onDecline} />)}
    </ul>
}