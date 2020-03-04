import React from 'react'

function LastEvents({ results }) {
    return <div className='last-events-container'>
        <ul>{results.map(event => {
            return <li>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p><b>{event.publisher}</b></p>
                <p>{event.location}</p>
                <p>{event.date}</p>
            </li>
        })}</ul>
    </div>
}

export default LastEvents