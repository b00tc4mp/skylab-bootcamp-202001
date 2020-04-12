import React, { useState } from 'react'
import { __handleUserUpdate__, __handleErrors__ } from '../handlers'
import { searchParks } from 'sick-parks-logic'
import Search from './Search'

export default function SearchContainer({ navigation }) {
    const [currentQuery, setCurrentQuery] = useState()
    const [error, setError] = useState(null)
    const [location, setLocation] = useState({ longitude: 0, latitude: 0 })
    //Location needs to be handleled in context toghether with user and errors.


    const handleOnSubmit = async (query) => {
        try {
            setCurrentQuery(query)
            const results = await searchParks(query, [location.longitude, location.latitude])

            if (!results.length) setError(`No ${query} parks found`)
            else setError(null)

            navigation.navigate('Results', { results, error }) // NEED TO PASS THE QUERY
        } catch ({ message }) {
            navigation.navigate('Results', { error: message })

        }
    }

    return <Search onSubmit={handleOnSubmit} />
}
