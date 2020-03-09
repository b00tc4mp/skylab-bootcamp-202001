import React from 'react'
import Feedback from './Feedback'

function Event({ event, subscribe, handleUpdate, error, userId }) {
    return <div>
        <h5>{event.title}</h5>
        <p>Description: {event.description}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>
        <p>ID: {event.id}</p>
        <p>Publisher: {event.publisher}</p>
        {userId !== event.publisher && <button onClick={() => subscribe(undefined, event.id)}>Subscribe</button>}
        {userId === event.publisher && <button onClick={() => handleUpdate('update')}>Edit</button>}
        {error && <Feedback error={error}/>}
    </div>
}

export default Event