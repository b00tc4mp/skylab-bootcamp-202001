import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContaienr } from '@react-navigation/native'
import { Login, Landing, Register, Home } from './components'

const Stack = createStackNavigator()


function LandingScreen({ navigation }) {

    return <Landing />
}

function RegisterScreen({ navigation }) {

    return <Register onSubmit={handleSubmit} onToLogin={handleGoToLogin} error={error} />
}

function LoginScreen({ navigation }) {

    return <Login onSubmit={handleSubmit} onToRegister={handleGoToRegister} error={error} />
}

function HomeScreen({ navigation }) {

    return <Home />
}


export const Routes = (props) => {

    return (
        <NavigationContaienr>
            <Stack.Navigator>
                <Stack.Screen name='Landing' component={LandingScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContaienr>
    )

}