import React from 'react'
import { StepOneContainer, StepTwoContainer, StepThreeContainer } from '../../components'
import { createStackNavigator } from "@react-navigation/stack"
import { colors, fonts } from '../../constants'
const BuilderStack = createStackNavigator()

const options = {
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: colors.MAIN,
    },
    headerTitleStyle: {
        fontFamily: fonts.SEMI
    },
    headerTintcolor: colors.SECONDARY
}

export default () => (
    <BuilderStack.Navigator screenOptions={options} initialRouteName='StepOne' >

        <BuilderStack.Screen name="StepOne" component={StepOneContainer} />
        <BuilderStack.Screen name="StepTwo" component={StepTwoContainer} />
        <BuilderStack.Screen name="StepThree" component={StepThreeContainer} />

    </BuilderStack.Navigator >
)

