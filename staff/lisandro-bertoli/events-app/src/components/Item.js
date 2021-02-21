import React from 'react'

const EventItem = ({ event: { id, title, description, publisher, date, location, created }, onSubscribe }) => {
    debugger
    const subscribeHandler = (event) => {
        event.preventDefault()

        onSubscribe(id)
    }

    return <li>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{location}</p>
        <p>Date: {date}</p>
        <p>Created: {created}</p>
        <p>{publisher.name}</p>
        <button onClick={subscribeHandler}>Subscibe!</button>
    </li>
}

export default EventItem