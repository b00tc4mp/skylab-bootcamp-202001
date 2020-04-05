import React from 'react'
import { View, Image } from 'react-native'
import Button from '../Button'
import styles from './styles'

export default function Landing({ onToHome, onToRegister, onToLogin }) {



    return (
        <View style={styles.container}>
            < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>

            <Button text='Sign in now' style={styles.buttonContainer} textStyle={styles.button} onPress={onToLogin} />
            <Button text='Sign up with an e-email' style={styles.buttonContainer} textStyle={styles.button} onPress={onToRegister} />
            <Button text='Skip sign in' style={styles.skipButton} textStyle={styles.button} onPress={onToHome} />
        </View>
    )
}

