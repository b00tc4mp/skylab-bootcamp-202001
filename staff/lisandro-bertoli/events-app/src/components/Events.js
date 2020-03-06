import React from 'react'
import Item from './Item'


const Events = ({ results }) => {

    return <section className="events">
        <ul>
            {results.map(result => <Item key={result.id} event={result} />)}
        </ul>
        {/* <button onClick={}> Next Page</button> */}
    </section>
}

export default Events