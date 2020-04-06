import React from 'react'
import { retrievePark } from 'sick-parks-logic'
import { __handleErrors__ } from '../../handlers'
import { Results } from '../presentational'


export default function ResultsContainer({ navigation, route }) {
    const [error, setError] = useState(route.error)

    const handleGoToDetails = async (id) => {
        try {
            const park = await retrievePark(id)

            navigation.navigate('ParkDetails', { park }) // NEED TO PASS THE PARK
        } catch (error) {
            if (error.name === 'NotFoundError') Alert.alert(error.message)
            else __handleErrors__(error.message, setError)
        }
    }

    return <Results results={route.results} error={error} onToDetails={handleGoToDetails} />
}
