import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function Button(props) {
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <Text style={styles[props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

