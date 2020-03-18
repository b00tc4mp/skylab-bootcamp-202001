import React from 'react'
import { View, Image } from 'react-native'
import Button from '../Button'
import styles from './styles'

export default function Login({ navigation }) {



    return (
        <View style={styles.container}>
            < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>

            <Button text='Sign in with Facebook' textStyle='text' type='facebook' />
            <Button text='Sign up with an e-email' textStyle='text' type='main' onPress={() => navigation.navigate('Register')} />
            <Button text='Already a member? Sing-in' textStyle='anchor' onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

