import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import StepOne from './StepOne/step-one'
import StepTwo from './StepTwo/step-two'
import StepThree from './StepThree/step-three'
import { View, Text } from 'react-native'
import MyButton from '../Button'
import styles from './styles'

const Stack = createStackNavigator()

export default function ParkBuilder({ onNewPark, error: _error, user, onToLogin }) {
    const [park, setPark] = useState({})
    const [features, setFeatures] = useState([])
    const [error, setError] = useState(_error)

    function StepOneScreen({ navigation }) {


        const handleToStepTwo = (name, resort, location, flow, level, size) => {
            switch (true) {
                case name === undefined || name.trim() === '':
                    setError('Name is empty')
                    break
                case resort === undefined || resort.trim() === '':
                    setError('Resort is empty')
                    break
                case location === undefined:
                    setError('Location is required')
                    break
                default:
                    setPark({ name, resort, location, flow, level, size })
                    debugger
                    navigation.navigate('Featues info')
            }
        }

        return <StepOne onToStepTwo={handleToStepTwo} error={error} />
    }

    function StepTwoScreen({ navigation }) {

        const handleToStepThree = (_features) => {
            debugger
            setFeatures(_features)

            navigation.navigate('Summary')
        }

        return <StepTwo onToStepThree={handleToStepThree} error={error} />

    }

    function StepThreeScreen({ navigation }) {

        const handleConfirmation = () => {
            const { location } = park

            park.location = {
                type: 'Point',
                coordinates: [location[0].longitude, location[0].latitude]
            }

            navigation.popToTop()

            onNewPark({ features, park })
        }

        return <StepThree park={park} features={features.length} onConfirmation={handleConfirmation} />
    }
    if (user === 'guest') {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hey stranger!</Text>

                </View>
                <View style={styles.top}>
                    <Text style={styles.text}>Hey there,</Text>
                    <Text style={styles.text}>if you want full access you will need to create an account</Text>
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

            <Stack.Screen name="Park info" component={StepOneScreen} />
            <Stack.Screen name="Featues info" component={StepTwoScreen} />
            <Stack.Screen name="Summary" component={StepThreeScreen} />


        </Stack.Navigator >
    )


}


