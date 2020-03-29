import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './StepOne/step-one'
import StepTwo from './StepTwo/step-two'
import StepThree from './StepThree/step-three'
import { View, Text } from 'react-native'
import MyButton from '../Button'
import styles from './styles'

const Stack = createStackNavigator()

export default function ParkBuilder({ onNewPark, error, user, onToLogin }) {

    if (user === 'guest') {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hey stranger!</Text>

                </View>
                <View style={styles.top}>
                    <Text
                        style={styles.text}
                    >Hey there, if you want full access you will need to create an account</Text>
                </View>
                <View style={styles.bottom}>
                    <MyButton
                        onPress={onToLogin}
                        style={styles.actionButton}
                        text='Login'
                        textStyle={styles.buttonText} />
                </View>
            </View>
        )
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: '#82A4B3',

                },
                headerTitleStyle: {
                    fontFamily: 'montserrat-semi'
                },
                headerTintColor: '#EFEBDA'
            }}
            initialRouteName='StepOne' >

            <Stack.Screen name="Park info" component={StepOne} />
            <Stack.Screen name="Featues info" component={StepTwo} />
            <Stack.Screen initialParams={{ onNewPark }} name="Summary" component={StepThree} />


        </Stack.Navigator >
    )


}


