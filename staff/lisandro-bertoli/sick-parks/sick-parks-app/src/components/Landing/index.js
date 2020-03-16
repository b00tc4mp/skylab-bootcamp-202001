import React from 'react'
import { View } from 'react-native'
import Button from '../Button'
import styles from './styles'

export default function Login({ onToLogin, onToRegister }) {

    return (
        <View style={styles.container}>
            <Button text='Sign in with Facebook' textStyle='text' type='facebook' />
            <Button text='Sign up with an e-email' textStyle='text' type='main' onPress={onToRegister} />
            <Button text='Already a member? Sing-in' textStyle='anchor' onPress={onToLogin} />
        </View>
    )
}

