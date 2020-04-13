import React, { useState, useEffect } from 'react'
import { __handleUserUpdate__, __handleErrors__ } from '../handlers'
import { searchParks } from 'sick-parks-logic'
import Search from './Search'

export default function SearchContainer({ navigation }) {
    //const [currentQuery, setCurrentQuery] = useState()  //TODO reimplement this with top search bar
    const [location, setLocation] = useState({})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function ({ coords }) {
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
            })
        })
    }, [])

    const handleOnSubmit = async (query) => {
        try {
            //setCurrentQuery(query)
            const results = await searchParks(query, [location.longitude, location.latitude])

            if (!results.length) throw new Error(`No ${query} parks found`)

            navigation.navigate('Results', { results }) // NEED TO PASS THE QUERY when reimplementing top search bar
        } catch ({ message }) {
            navigation.navigate('Results', { error: message })

        }
    }

    return <Search onSubmit={handleOnSubmit} />
}
