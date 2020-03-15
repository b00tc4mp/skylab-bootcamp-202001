import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function Feedback({ level, message }) {
    return (<>
        <View style={styles.container}>
            {level === 'warn' && <Text style={[styles.msg, styles.warning]}>🚽 {message} 🚽</Text>}
            {level === 'error' && <Text style={[styles.msg, styles.error]}>🚽 {message} 🚽</Text>}
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    msg: {
        fontSize: 25,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    warning: {
        backgroundColor: 'orange'
    },
    error: {
        backgroundColor: 'red'
    }
})

export default Feedback