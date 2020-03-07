import React, { useState, useContext, useEffect } from 'react'
import Events from './Events'
import { retrieveLastEvents, PublishEvent, retrievePublishedEvents, subscribeToEvent, logout, isLoggedIn, retrieveUser } from '../logic'
import Publish from './Publish'
import { Context } from './ContextProvider'


const Home = () => {
    const [events, setEvents] = useState()
    const [name, setName] = useState()

    const [state, setState] = useContext(Context)

    useEffect(() => {
        if (isLoggedIn()) {

            (async () => {
                try {
                    const { name: _name } = await retrieveUser()

                    setName(_name)

                    setState({ page: 'home' })
                } catch ({ message }) {
                    setState({ error: message })
                }

            })()
        } else setState({ page: 'login' })
    })


    const handlePublishEvent = async (title, description, date, location) => {
        PublishEvent(title, description, location, date)
    }

    const handleSubscription = async (eventId) => {
        await subscribeToEvent(eventId)
    }

    const handleGetLatestEvents = async (event) => {
        event.preventDefault()
        const events = await retrieveLastEvents()

        setEvents(events)
    }

    const handleGetPublishedEvents = async (event) => {
        event.preventDefault()
        const events = await retrievePublishedEvents()

        setEvents(events)
    }

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
    }

    return <section className="home">
        <h2>Welcome, {name}</h2><button onClick={handleLogout}>Logout</button>
        <button onClick={handleGetLatestEvents}>Latest Events</button>
        <button onClick={handleGetPublishedEvents}>Published Events</button>

        <Publish onSubmit={handlePublishEvent} />

        {events && <Events results={events} onSubscribe={handleSubscription} />}

    </section >
}

export default Home