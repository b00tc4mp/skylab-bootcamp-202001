import React, { useState } from 'react'
import { __handleUserUpdate__, __handleErrors__ } from '../handlers'
import { createPark } from 'sick-parks-logic'
import StepThree from './ParkBuilder/StepThree'

export default function StepThreeContainer({ navigation, route }) {
    const [error, setError] = useState(null)
    const { park, features } = route.params


    const handleConfirmation = async () => {
        const { location } = park


        try {
            park.location = {
                type: 'Point',
                coordinates: [location[0].longitude, location[0].latitude]
            }

            await createPark({ park, features })

            // await __handleUserUpdate__(setError) // TODO modify retrieve user to replace this
            navigation.popToTop()

            Alert.alert('Park created!')

        } catch ({ message }) {
            console.log(message)
        }

    }

    return <StepThree park={park} features={features.length} onConfirmation={handleConfirmation} />
}