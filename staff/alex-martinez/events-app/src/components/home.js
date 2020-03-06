import React, { useState } from 'react'
import Events from './events'
import { retrieveLastEvents, createEvent, retrievePublishedEvents } from '../logic'
import PublishEvent from './publish-event'

const Home = ({ name }) => {
    const [events, setEvents] = useState()
    const [publish, setPublish] = useState()
    const [view, setView] = useState()

    const changeView = async (view) => {
        if(view === 'events') {
            const events = await retrieveLastEvents()
            setEvents(events)
        }else{
            const {token} = sessionStorage
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
        createEvent(token, title, description, location, date)
    }



    return <section className="home">
        <h1>Title</h1>
        <h2>{name}</h2>
        <p>Want to see the latest events?<button onClick={(event)=>{
            event.preventDefault()
            changeView('events')}}>Click here</button></p>
        {view === 'events' && <Events results={events} />}
        <p>Want to create event?<button onClick={showPublishForm}>Click here</button></p>
        {publish && <PublishEvent onSubmit={handlePublishEvent}/>}
        <p>Want to see published events?<button onClick={(event)=>{
            event.preventDefault()
            changeView('published')}}>Click here</button></p>
        {view === 'published' && <Events results={events} />}

    </section>
}

export default Home