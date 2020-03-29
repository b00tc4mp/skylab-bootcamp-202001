import React from "react"
import LastEvent from "./last-events"

export default function ({lastEvents}){
    return  <section>
        
    {lastEvents.map((event, index)=> <LastEvent key={index} lastEvents={event} /> )}

    </section>
}