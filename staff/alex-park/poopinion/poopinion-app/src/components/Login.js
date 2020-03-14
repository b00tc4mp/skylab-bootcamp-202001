import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, Image } from 'react-native'

function Login({ onSubmit }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Login</Text>
                <TouchableOpacity>
                    <TextInput placeholder='youremail@mail.com' onChangeText={(text) => setEmail(text)} />
                    <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)} />
                </TouchableOpacity>
                {error && <Text style={styles.error}>{error}</Text>}
                <Button title='Submit' onPress={() => onSubmit(email, password)} />
            </View>
        </ScrollView>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        flexDirection: 'column',
        marginTop: 100,
        marginHorizontal: '5%'
    },
    header: {
        fontSize: 40
    },
    error: {
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    }
})

export default Login