import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import CustomButton from './presentational/button'

export default function Login() {
    return (
        <View style={styles.form}>

            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>
            <TextInput style={styles.input}></TextInput>

            <CustomButton text='Register' />
        </View>
    )
}


const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    input: {
        backgroundColor: '#82A4B3',
        flex: 0.15,
        color: '#EFEBDA',
        borderRadius: 5
    }
})