import React, { useState } from 'react'
import { TextInput, Text, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import Button from '../Button'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ navigation, extraData }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { error, handleLogin } = extraData

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <KeyboardAwareScrollView contentContainerStyle={styles.container} >
                < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>
                <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} />

                <Button text='Login' type='main' textStyle='text' onPress={() => handleLogin({ email, password })} />
                {error && <Text style={styles.danger}>{error}</Text>}
                <Button text='Not a member yet? Sign up' textStyle='anchor' onPress={() => navigation.navigate('Register')} />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>

    )
}


