import React, { useState } from 'react'
import Events from './Events'
import { retrieveLastEvents, PublishEvent, retrievePublishedEvents } from '../logic'
import Publish from './Publish'

const Home = ({ name }) => {
    const [events, setEvents] = useState()
    const [publish, setPublish] = useState()
    const [view, setView] = useState()

    const changeView = async (view) => {
        if (view === 'events') {
            const events = await retrieveLastEvents()
            setEvents(events)
        } else {
            const { token } = sessionStorage
            const events = await retrievePublishedEvents(token)
            setEvents(events)

        }

        setView(view)
    }


    const showPublishForm = async (event) => {
        event.preventDefault()

        setPublish(true)
    }

    const handlePublishEvent = async (token, title, description, date, location) => {
        PublishEvent(token, title, description, location, date)
    }



    return <section className="home">
        <h2>Welcome, {name}</h2>
        <button onClick={(event) => {
            event.preventDefault()
            changeView('events')
        }}>Latest Events</button>
        {view === 'events' && <Events results={events} />}
        <button onClick={showPublishForm}>Publishe an Event</button>
        {publish && <Publish onSubmit={handlePublishEvent} />}
        <button onClick={(event) => {
            event.preventDefault()
            changeView('published')
        }}>Published Events</button>
        {view === 'published' && <Events results={events} />}

    </section >
}

export default Home