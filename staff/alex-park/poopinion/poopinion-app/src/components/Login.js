import React, { useState } from 'react'
import Feedback from './Feedback'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, Image } from 'react-native'

function Login({ onSubmit, error, goToRegister, goToLanding }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Login</Text>
                <TouchableOpacity>
                    <TextInput style={styles.form} placeholder='youremail@mail.com' onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.form} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                </TouchableOpacity>
                {error && <Feedback level='warn' message={error}/>}
                <Text style={styles.button} onPress={() => onSubmit(email, password)}>💩 💩 💩 Log in! 💩 💩 💩</Text>
                <View style={styles.navButtons}>
                    <View style={styles.left}>
                        <Button title='Sign Up' onPress={goToRegister} />
                    </View>

                    <View style={styles.right}>
                        <Button title='Continue as Guest' onPress={goToLanding}/>
                    </View>
                </View>
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
    },
    button: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 20,
        backgroundColor: 'brown',
        padding: 20,
        overflow: 'hidden',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 25
    },
    form: {
        fontSize: 20,
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: 'lightgrey',
        borderRadius: 10
    },
    navButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        flex: 1,
        marginHorizontal: 10
    }
})

export default Login