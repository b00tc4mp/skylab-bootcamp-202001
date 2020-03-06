import React from 'react'
import Feedback from './Feedback'

function Event({ event, subscribe, handleUpdate, error, userId }) {
    return <div>
        <h5>{event.title}</h5>
        <span>Description: {event.description}</span><br/>
        <span>Location: {event.location}</span><br/>
        <span>Date: {event.date}</span>
        <span>ID: {event.id}</span>
        {userId !== event.publisher && <button onClick={() => subscribe(undefined, event.id)}>Subscribe</button>}
        {userId === event.publisher && <button onClick={() => handleUpdate('update')}>Edit</button>}
        {error && <Feedback error={error}/>}
    </div>
}

export default Event