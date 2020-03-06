import React from 'react'

export default ({ onSubmit }) => {

    function handleOnSubmit(event) {
        event.preventDefault()
        const { title, description, date, location } = event.target
        const { token } = sessionStorage

        onSubmit(token, title.value, description.value, new Date(date.value), location.value)
    }

    return <form action="" onSubmit={handleOnSubmit}>
        <input type="text" name="title" placeholder="event title" />
        <input type="text" name="description" placeholder="event description" />
        <input type="date" name="date" placeholder="event date" />
        <input type="text" name="location" placeholder="event location" />
        <button type="submit">Publish event</button>
    </form>
}