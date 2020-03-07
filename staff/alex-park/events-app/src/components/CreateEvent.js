import React from 'react'
import './CreateEvent.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, error }) {
    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            title: { value: title },
            description: { value: description },
            date: { value: date },
            location: { value: location }
        } } = event

        onSubmit(title, description, date, location)
    }

    return <>
        <form className="create-event" onSubmit={handleSubmit}>
            <input type='text' name='title' placeholder='Title'/>
            <textarea type='text' name='description' placeholder='Description of the event'/>
            <input type='date' name='date' placeholder='Date'/>
            <input type='text' name='location' placeholder='Location'/>
            <button>Create Event</button>
        </form>
        {error && <Feedback message={error} level='warn'/>}
    </>
}