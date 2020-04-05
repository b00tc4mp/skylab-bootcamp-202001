import React from 'react'
import { StepOneContainer, StepTwoContainer, StepThreeContainer } from '../containers'
import { createStackNavigator } from "@react-navigation/stack"

const BuilderStack = createStackNavigator()

const options = {
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: '#82A4B3',
    },
    headerTitleStyle: {
        fontFamily: 'montserrat-semi'
    },
    headerTintColor: '#EFEBDA'
}

export default () => (
    <BuilderStack.Navigator screenOptions={options} initialRouteName='StepOne' >

        <BuilderStack.Screen name="Park info" component={StepOneContainer} />
        <BuilderStack.Screen name="Featues info" component={StepTwoContainer} />
        <BuilderStack.Screen name="Summary" component={StepThreeContainer} />


    </BuilderStack.Navigator >
)

)