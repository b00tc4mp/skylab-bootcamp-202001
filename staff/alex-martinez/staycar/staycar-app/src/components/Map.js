import React, { useState, useEffect } from 'react';
import './style/Map.sass'
import {retrieveLots} from '../logic'
import { MapItem, Feedback } from '.'

export default function() {
    const [lots, setLots] = useState([])
    const [error, setError] = useState()

    async function handleRetrieveLots() {
        try{
            const lots = await retrieveLots()
            setLots(lots)
        }catch(error){
            setError(error.message)
        }
    }

    useEffect(() => {
        
        handleRetrieveLots() 
    }, [])

    return <section className="map">
        <h1 className="map__title">Plates Map:</h1>
        <section className="plates">

            {lots.map(lot => <MapItem key={lot.id} lot={lot} />)}

            {error && <Feedback message={error} level="warn" />}
            
        </section>
    </section>

    
}
