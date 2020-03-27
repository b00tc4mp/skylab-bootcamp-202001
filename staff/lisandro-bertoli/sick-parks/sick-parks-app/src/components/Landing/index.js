import React from 'react'
import { View, Image } from 'react-native'
import Button from '../Button'
import styles from './styles'

export default function Login({ navigation }) {



    return (
        <View style={styles.container}>
            < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>

            <Button text='Sign in now' style={styles.buttonContainer} textStyle={styles.button} onPress={() => navigation.navigate('Login')} />
            <Button text='Sign up with an e-email' style={styles.buttonContainer} textStyle={styles.button} onPress={() => navigation.navigate('Register')} />
            <Button text='Skip sign in' style={styles.skipButton} textStyle={styles.button} onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

