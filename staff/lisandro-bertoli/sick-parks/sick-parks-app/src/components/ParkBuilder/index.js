import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import { Alert } from 'react-native'



const Stack = createStackNavigator()

export default function ParkBuilder({ navigation, route }) {
    // const [_park, setPark] = useState()
    // const [_features, setFeatures] = useState()
    const { error, handleNewPark } = route.params


    const getParkData = ({ features, park }) => {
        handleNewPark({ features, park })
        Alert.alert('Park created! Go check it out')

    }



    return (
        <Stack.Navigator initialRouteName='StepOne' >

            <Stack.Screen name="Park info" component={StepOne} />
            <Stack.Screen name="Featues info" component={StepTwo} />
            <Stack.Screen initialParams={{ getParkData }} name="Summary" component={StepThree} />


        </Stack.Navigator >
    )
}