import React from 'react'
import { StepTwo } from '../presentational'

export default function StepTwoContainer({ navigation, route }) {
    const { park } = route.params
    const handleToStepThree = features => {
        console.log(park)
        navigation.navigate('StepThree', { park, features })

    }

    return <StepTwo onToStepThree={handleToStepThree} />

}
