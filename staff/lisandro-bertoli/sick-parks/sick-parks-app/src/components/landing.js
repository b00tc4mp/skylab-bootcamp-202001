import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import CustomButton from './presentational/button'

export default function Login() {
    return (
        <View style={styles.landing}>
            <CustomButton text='Sign up with an e-email' />
            <Button title='Already a member? Sing-in' />
        </View>
    )
}


const styles = StyleSheet.create({
    landing: {
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