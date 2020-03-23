import React, { useState, useEffect } from 'react'
import { TextInput, Text, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import Button from '../Button'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ onSubmit, onToRegister, error }) {
    const [email, setEmail] = useState('licha@mail.com')
    const [password, setPassword] = useState('123')

    const handleOnSubmit = () => onSubmit(email, password)

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <KeyboardAwareScrollView contentContainerStyle={styles.container} >
                < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>
                <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} value={email} />
                <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} value={password} />

                <Button text='Login' type='main' textStyle='text' onPress={handleOnSubmit} />
                {error && <Text style={styles.danger}>{error}</Text>}
                <Button text='Not a member yet? Sign up' textStyle='anchor' onPress={onToRegister} />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>

    )
}


