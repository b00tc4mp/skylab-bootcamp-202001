import React from 'react'

export default ({results}) => {
    return (
        <ul>
        {results.map(event => {
            return <li>
            <h2>{event.title}</h2>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Publisher: {event.publisher.name}</p>
            </li>
        })}
        </ul>
        
    )
}

