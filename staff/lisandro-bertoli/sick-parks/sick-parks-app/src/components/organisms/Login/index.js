import React, { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import Button from '../../atoms/Button'
import styles from './styles'

export default function Login({ onSubmit, error, onToRegister }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (

        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} />

            <Button text='Login' type='main' textStyle='text' onPress={() => { console.log('pressed'), onSubmit({ email, password }) }} />
            {error && <Text style={styles.danger}>{error}</Text>}
            <Button text='Not a member yet? Sign up' textStyle='anchor' onPress={onToRegister} />
        </View>
    )
}

