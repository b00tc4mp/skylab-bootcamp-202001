import React, { useState } from 'react'
import { View, TextInput, ScrollView, Text, Keyboard } from 'react-native'
import Button from '../../atoms/Button'
import styles from './styles'

export default function Register({ onToLogin, onSubmit, error }) {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (

        // <ScrollView >
        <View style={styles.container}>

            <TextInput style={styles.input} placeholder='Your name here' onChangeText={(text) => setName(text)} />
            <TextInput style={styles.input} placeholder='Your surname here' onChangeText={(text) => setSurname(text)} />
            <TextInput style={styles.input} placeholder='Your e-mail here' onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.input} placeholder='Your password here' onChangeText={(text) => setPassword(text)} />
            <Button text='Register' type='main' textStyle='text' onPress={() => onSubmit({ name, surname, email, password })} />
            {error && <Text style={styles.danger}>{error}</Text>}
            <Button type='anchor' textStyle='anchor' text='Already a member? Sign in' onPress={onToLogin} />
        </View>
        // </ScrollView>

    )
}
