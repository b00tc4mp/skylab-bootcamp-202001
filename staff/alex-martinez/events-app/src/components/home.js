import React, { useState } from 'react'
import Events from './events'
import { retrieveLastEvents, createEvent } from '../logic'
import PublishEvent from './publish-event'

const Home = ({ name }) => {
    const [events, setEvents] = useState()
    const [publish, setPublish] = useState()

    const showEvents = async (event) => {
        event.preventDefault()

        const _events = await retrieveLastEvents()

        return setEvents(_events)
    }

    const showPublishForm = async (event) => {
        event.preventDefault()

        setPublish(true)
    }

    const handlePublishEvent = async (token, title, description, date, location) => {
        createEvent(token, title, description, location, date)
    }


    return <section className="home">
        <h1>Title</h1>
        <h2>{name}</h2>
        <p>Want to see the latest events?<button onClick={showEvents}>Click here</button></p>
        {events && <Events results={events} />}
        <p>Want to create event?<button onClick={showPublishForm}>Click here</button></p>
        {publish && <PublishEvent onSubmit={handlePublishEvent}/>}

    </section>
}

export default Home