import React, { useState } from 'react'
import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '../index'
import styles from './styles'

export default function Register({ navigation, extraData }) {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { error, handleRegister } = extraData


    const registerUser = async () => {

        await handleRegister({ name, surname, email, password })
        if (!error) navigation.navigate('Login', { error: null })
        else console.log(error)

    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container} >
                < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>

                <TextInput style={styles.input} placeholder='Your name here' onChangeText={(text) => setName(text)} />
                <TextInput style={styles.input} placeholder='Your surname here' onChangeText={(text) => setSurname(text)} />
                <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} />
                <Button text='Register' type='main' textStyle='text' onPress={registerUser} />
                {error && <Text style={styles.danger}>{error}</Text>}
                <Button type='anchor' textStyle='anchor' text='Already a member? Sign in' onPress={() => navigation.navigate('Login')} />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}


