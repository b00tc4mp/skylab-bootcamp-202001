import React, {useState, useEffect} from 'react'
import './style/Report.sass'
import {retrieveTickets} from '../logic'
import { ReportItem } from '.'

export default function() {

    const [tickets, setTickets] = useState([])

    async function handleRetrieveTickets() {
        try{
            const res = await retrieveTickets()
            setTickets(res)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {

        handleRetrieveTickets()
       
    }, [])


    return <section className="report">
    <h1 className="report__title">Report</h1>

    {tickets.map(ticket => <ReportItem key={ticket.id} ticket={ticket} />)}

</section>
}