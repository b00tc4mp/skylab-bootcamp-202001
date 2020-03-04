import React from 'react'
import Feedback from './feedback'

function Home ({ name, error, onPublishEvent, onRetrieveLastEvents }) {
    return <div className='home-container'>
        <h2>{`Hello ${name}! What do you wanna do?`}</h2>
        <button onClick={event => {
            event.preventDefault()
            onPublishEvent()
        }}>Publish an event</button>

        <button onClick={event => {
            event.preventDefault()
            onRetrieveLastEvents()
        }}>Retrieve Last Events</button>
    </div>
}

export default Home