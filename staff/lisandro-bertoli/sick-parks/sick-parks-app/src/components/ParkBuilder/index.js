import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'



const Stack = createStackNavigator()

export default function ParkBuilder({ navigation, route }) {

    const { error, handleNewPark } = route.params



    return (
        <Stack.Navigator initialRouteName='StepOne' >

            <Stack.Screen name="Park info" component={StepOne} />
            <Stack.Screen name="Featues info" component={StepTwo} />
            <Stack.Screen initialParams={{ handleNewPark }} name="Summary" component={StepThree} />


        </Stack.Navigator >
    )
}