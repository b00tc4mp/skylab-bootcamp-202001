import React, { useState } from 'react'
import Events from './events'
import { retrieveLastEvents } from '../logic'

const Home = ({ name }) => {
    const [events, setEvents] = useState()

    const showEvents = (event) => {
        event.preventDefault()

        return retrieveLastEvents()
            .then(events => setEvents(events))
    }


    return <section className="home">
        <h1>Title</h1>
        <h2>{name}</h2>
        <p>Want to see the latest events?<button onClick={showEvents}>Click here</button></p>
        {events && <Events results={events} />}
    </section>
}

export default Home