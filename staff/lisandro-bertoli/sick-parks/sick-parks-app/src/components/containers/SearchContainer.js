import React, { useState } from 'react'
import { __handleUserUpdate__ } from '../../handlers'
import { searchParks } from 'sick-parks-logic'
import { Search } from '../presentational'

export default function SearchContainer({ navigation }) {
    const [currentQuery, setCurrentQuery] = useState()
    const [error, setError] = useState(null)
    //Location needs to be handleled in context toghether with user and errors.

    const handleOnSubmit = async (query) => {
        try {
            setCurrentQuery(query)
            const results = await searchParks(query, [location.longitude, location.latitude])

            if (!results.length) setError(`No ${query} parks found`)
            else setError(null)

            navigation.navigate('Results', { results, error }) // NEED TO PASS THE QUERY
        } catch ({ message }) {
            __handleErrors__(message, setError)

            navigation.navigate('Results')

        }
    }

    return <Search onSubmit={handleOnSubmit} />
}
