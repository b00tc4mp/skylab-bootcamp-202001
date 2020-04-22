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
    headerTintColor: colors.SECONDARY
}

export default () => (
    <BuilderStack.Navigator screenOptions={options} initialRouteName='StepOne' >

        <BuilderStack.Screen name="StepOne" options={{ title: 'New Park' }} component={StepOneContainer} />
        <BuilderStack.Screen name="StepTwo" options={{ title: 'Add Features' }} component={StepTwoContainer} />
        <BuilderStack.Screen name="StepThree" options={{ title: 'Summary' }} component={StepThreeContainer} />

    </BuilderStack.Navigator >
)

