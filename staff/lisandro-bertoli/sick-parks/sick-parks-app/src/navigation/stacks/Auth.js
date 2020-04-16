import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { LoginContainer, RegisterContainer, LandingContainer } from '../../components'
import { colors, fonts } from '../../constants'

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

const AuthStack = createStackNavigator()

export default () => (

    <AuthStack.Navigator screenOptions={options}>
        <AuthStack.Screen options={{ headerShown: false }} name='Landing' component={LandingContainer} />
        <AuthStack.Screen options={{ title: 'Sign up' }} name='Register' component={RegisterContainer} />
        <AuthStack.Screen options={{ title: 'Sign in' }} name='Login' component={LoginContainer} />
    </AuthStack.Navigator>

)

