import React from 'react'
import Item from './Item'
import Feedback from './Feedback'
import './Events.sass'

const Events = ({ results, onSubscribe }) => {

    return <section className="events">
        {results.length === 0 && <Feedback message='No results' level='info' />}
        <ul>
            {results.map(result => <Item key={result.id} event={result} onSubscribe={onSubscribe} />)}
        </ul>
        {/* <button onClick={}> Next Page</button> */}
    </section>
}

export default Events