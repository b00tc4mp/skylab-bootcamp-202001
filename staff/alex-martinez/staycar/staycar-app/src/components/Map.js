import React, { useState, useEffect } from 'react';
import './style/Map.sass'
import {retrieveLots} from '../logic'
import { MapItem } from '.'

export default function() {
    const [lots, setLots] = useState([])

    async function handleRetrieveLots() {
        const lots = await retrieveLots()
        setLots(lots)
    }

    useEffect(() => {
        
        handleRetrieveLots() 
    }, [])

    /* return <section className="map">
        <h1 class="map__title">PLATES MAP</h1>
        {lots.map(lot=><div>{lot.number}</div>)}
    </section> */

    return <section className="map">
        <h1 className="map__title">Plates Map:</h1>
        <section className="plates">

            {lots.map(lot => <MapItem key={lot.id} lot={lot} />)}
            
        </section>
    </section>

    
}
