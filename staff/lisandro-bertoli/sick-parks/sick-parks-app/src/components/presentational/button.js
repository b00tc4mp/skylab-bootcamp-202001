import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function CustomButton({ text }) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EFEBDA',
        width: 250,
        flex: 0.12,
        borderRadius: 5,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,

    }
})