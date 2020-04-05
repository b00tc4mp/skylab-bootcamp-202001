import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { LoginContainer, RegisterContainer, LandingContainer } from '../containers'

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

const AuthStack = createStackNavigator()

export default () => (
    <AuthStack.Navigator screenOptions={options}>
        <AuthStack.Screen options={{ headerShown: false }} name='Landing' component={LandingContainer} />
        <AuthStack.Screen options={{ title: 'Sign up' }} name='Register' component={RegisterContainer} />
        <AuthStack.Screen options={{ title: 'Sign in' }} name='Login' component={LoginContainer} />
    </AuthStack.Navigator>
)

