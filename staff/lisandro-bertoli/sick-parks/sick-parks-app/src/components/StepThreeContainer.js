import React from 'react'
import { __handleUserUpdate__, __handleErrors__ } from '../handlers'
import { createPark } from 'sick-parks-logic'
import { Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import StepThree from './ParkBuilder/StepThree'

export default function StepThreeContainer({ navigation, route }) {
    const { park, features } = route.params

    const handleConfirmation = async () => {
        const { location } = park
        try {
            park.location = {
                type: 'Point',
                coordinates: [location.longitude, location.latitude]
            }
            await createPark({ park, features })

            // await __handleUserUpdate__(setError) // TODO modify retrieve user to replace this
            Alert.alert('Park created!')
        } catch ({ message }) {
            Alert.alert(message)
        } finally {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })) // TODO see for this to take me to park details
        }
    }

    return <StepThree park={park} features={features.length} onConfirmation={handleConfirmation} />
}