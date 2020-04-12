import React, { useState } from 'react'
import StepOne from './ParkBuilder/StepOne'

export default function StepOneContainer({ navigation }) {
    const [error, setError] = useState(null)

    const handleToStepTwo = (name, resort, location, flow, level, size) => {
        switch (true) {
            case name === undefined || name.trim() === '':
                setError('Name is empty')
                break
            case resort === undefined || resort.trim() === '':
                setError('Resort is empty')
                break
            case location === undefined:
                setError('Location is required')
                break
            default:
                const park = { name, resort, location, flow, level, size }
                debugger
                navigation.navigate('StepTwo', { park })
        }
    }

    return <StepOne onToStepTwo={handleToStepTwo} error={error} />
}