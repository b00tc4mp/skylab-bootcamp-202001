import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import { KeyboardAvoidingView } from 'react-native'


const Stack = createStackNavigator()

export default function ParkBuilder() {
    const [park, setPark] = useState()
    const [features, setFeatures] = useState()
    const [error, setError] = useState()

    const getParkInfo = (park) => {
        console.log(park)
    }

    return (
        <Stack.Navigator initialRouteName='StepOne' >

            <Stack.Screen name="Add a Park">
                {props => <StepOne {...props} extraData={{ getParkInfo }} />}
            </Stack.Screen>
            {/* <Stack.Screen name="StepTwo">
                    {props => <StepTwo {...props} extraData={{ handleRegister, error }} />}
                </Stack.Screen>
                <Stack.Screen name="StepThree">
                    {props => <StepThree {...props} extraData={{ handleLogin, error }} />}
                </Stack.Screen> */}

        </Stack.Navigator >
    )
}