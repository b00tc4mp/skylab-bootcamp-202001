import React from 'react'
import PublishEvent from "./PublishEvent"

export default ({lastEvents, createEvent}) => {
    return (
        <div>
        <form onSubmit = { (event) =>{
            event.preventDefault()
            lastEvents()
        }}>
            <button>Last Events</button>
        </form>
            <PublishEvent createEvent={createEvent} />
        </div>
    )
}