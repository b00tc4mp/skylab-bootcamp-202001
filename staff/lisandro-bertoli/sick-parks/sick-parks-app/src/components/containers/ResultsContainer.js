import React from 'react'
import { retrievePark } from 'sick-parks-logic'
// import { __handleUserUpdate__ } from '../../handlers'
import { Results } from '../presentational'


export default function ResultsScreen({ navigation }) {
    const handleGoToDetails = (id) => {
        try {
            const item = await retrievePark(id)
            setDetailedPark(item)

            navigation.navigate('ParkDetails')
        } catch (error) {
            if (error.name === 'NotFoundError') Alert.alert(error.message)
            else __handleErrors__(error.message, setError)
        }
    }

    return <Results results={results} error={error} onToDetails={handleGoToDetails} />
}
