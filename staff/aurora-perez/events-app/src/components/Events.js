import React from 'react'
import './Events.sass'
import './Event.sass'

export default ({results}) => {
    return (
        <ul className = "events">
        {results.map(event => {
            return <li className="event">
            <h2>{event.title}</h2>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Publisher: {event.publisher}</p>
            </li>
        })}
        </ul>
        
    )
}

