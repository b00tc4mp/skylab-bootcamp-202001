import React, { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import Button from '../../atoms/Button'
import styles from './styles'

export default function Login({ onSubmit, error }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} />

            <Text style={styles.danger}>{error || ''}</Text>
            <Button text='Login' type='main' onPress={() => onSubmit({ email, password })} />
        </View>
    )
}

