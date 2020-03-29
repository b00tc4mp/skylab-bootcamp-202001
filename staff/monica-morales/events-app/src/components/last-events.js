import React from "react"

export default function ({lastEvents}){

    const {_id, title, description, date, location, publisher, created} = lastEvents
    return <section>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <h2>{location}</h2>
        <h2>{date}</h2>
        <h2>{publisher}</h2>
        <h2>{created}</h2>
    </section>
}