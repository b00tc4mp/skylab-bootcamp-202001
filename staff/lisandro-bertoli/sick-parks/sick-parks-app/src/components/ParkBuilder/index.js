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


    const getParkInfo = (data) => {
        setPark(data)
        // console.log(park)
    }

    const getFeaturesInfo = (info) => {

    }

    return (
        <Stack.Navigator initialRouteName='StepOne' >

            <Stack.Screen name="Park info" component={StepOne} />
            <Stack.Screen initialParams={{ getFeaturesInfo }} name="Featues info" component={StepTwo} />
            {/* <Stack.Screen name="StepThree">
                    {props => <StepThree {...props} extraData={{ handleLogin, error }} />}
                </Stack.Screen> */}

        </Stack.Navigator >
    )
}