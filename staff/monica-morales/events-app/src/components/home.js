import React from "react"

export default function({user, onToGoRetrieveEvents}) {

    const {name} = user
    
    return <div>
        <h2>{name}</h2>
        <button onClick={event=>{
            event.preventDefault()
            onToGoRetrieveEvents()
        }}>Go to Last Events</button>
    </div>
    
}