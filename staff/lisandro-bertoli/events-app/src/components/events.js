import React from 'react'


const Events = ({ results }) => {

    return <section className="events">
        <ul>
            {results.map(result =>
                <li>
                    <h3>{result.title}</h3>
                    <p>{result.description}</p>
                    <p>{result.location}</p>
                    <p>{result.date}</p>
                    <p>{result.publisher}</p>

                </li>
            )}
        </ul>
    </section>
}

export default Events