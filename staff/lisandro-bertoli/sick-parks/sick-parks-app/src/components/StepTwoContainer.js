import React from 'react'
import StepTwo from './ParkBuilder/StepTwo'

export default function StepTwoContainer({ navigation, route }) {
    const { park } = route.params
    const handleToStepThree = features => navigation.navigate('StepThree', { park, features })

    return <StepTwo onToStepThree={handleToStepThree} />
}
