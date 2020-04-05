import React from 'react'
import { __handleUserUpdate__ } from '../../handlers'
import { searchParks } from 'sick-parks-logic'
import { Search } from '../presentational'

export default function SearchScreen({ navigation }) {
    //Location needs to be handleled in context toghether with user and errors.

    const handleOnSubmit = (query) => {
        try {
            setCurrentQuery(query)
            const results = await searchParks(query, [location.longitude, location.latitude])

            if (!results.length) setError(`No ${query} parks found`)
            else setError(null)

            setResults(results)

            navigation && navigation.navigate('Results')
        } catch ({ message }) {
            __handleErrors__(message, setError)

            navigation.navigate('Results')

        }
    }

    return <Search onSubmit={handleOnSubmit} />
}
