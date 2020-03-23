import React, { useState } from 'react'
import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '../index'
import styles from './styles'

export default function Register({ onSubmit, error, onToLogin }) {
    const [name, setName] = useState('n')
    const [surname, setSurname] = useState('s')
    const [email, setEmail] = useState('e2@mail.com')
    const [password, setPassword] = useState('123')

    const handleSubmit = () => onSubmit(name, surname, email, password)

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container} >
                < Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>
                <TextInput style={styles.input} placeholder='Your name here' onChangeText={(text) => setName(text)} value={name} />
                <TextInput style={styles.input} placeholder='Your surname here' onChangeText={(text) => setSurname(text)} value={surname} />
                <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} value={email} />
                <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} value={password} />
                <Button text='Register' type='main' textStyle='text' onPress={handleSubmit} />
                {error && <Text style={styles.danger}>{error}</Text>}
                <Button type='anchor' textStyle='anchor' text='Already a member? Sign in' onPress={onToLogin} />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}


