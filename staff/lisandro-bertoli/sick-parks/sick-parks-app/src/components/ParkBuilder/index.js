import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from '../Button'

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
                        style={{ textAlign: 'center' }}
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
        <Stack.Navigator initialRouteName='StepOne' >

            <Stack.Screen name="Park info" component={StepOne} />
            <Stack.Screen name="Featues info" component={StepTwo} />
            <Stack.Screen initialParams={{ onNewPark }} name="Summary" component={StepThree} />


        </Stack.Navigator >
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#EDF4F9',
    },
    header: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: '#82A4B3',
        justifyContent: 'space-between',
        padding: 15,

    },
    headerText: {
        paddingTop: 10,
        alignSelf: 'center',
        color: '#EFEBDA',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-end'
    },

    top: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 15

    },
    bottom: {
        flex: 0.4,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 40,
        justifyContent: 'space-around'
    },

    actionButton: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#82A4B3",
        height: 40,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: '#82A4B3'

    },
})