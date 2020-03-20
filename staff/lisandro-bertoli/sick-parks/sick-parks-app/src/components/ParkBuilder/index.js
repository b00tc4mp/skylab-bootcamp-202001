import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'



const Stack = createStackNavigator()

export default function ParkBuilder() {
    const [park, setPark] = useState()
    const [features, setFeatures] = useState()

    const getParkInfo = (info) => {
        setPark(info.park)
        setFeatures(info.features)

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