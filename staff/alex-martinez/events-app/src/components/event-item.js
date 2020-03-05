import React from 'react'

const EventItem = ({ event: { title, description, publisher, date, location, created } }) => {
    return <li>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{location}</p>
        <p>Date: {date}</p>
        <p>Created: {created}</p>
        <p>{publisher}</p>
    </li>
}

export default EventItem