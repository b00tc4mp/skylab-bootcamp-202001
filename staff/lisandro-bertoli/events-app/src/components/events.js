import React from 'react'
import EventItem from './event-item'


const Events = ({ results }) => {

    return <section className="events">
        <ul>
            {results.map(result => <EventItem key={result.id} event={result} />)}
        </ul>
        {/* <button onClick={}> Next Page</button> */}
    </section>
}

export default Events