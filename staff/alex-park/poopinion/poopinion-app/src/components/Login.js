import React, { useState } from 'react'
import Feedback from './Feedback'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, KeyboardAvoidingView, Image, Dimensions } from 'react-native'

function Login({ onSubmit, error, goToRegister, goToLanding }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <Image source={require('../../assets/header.png')} style={styles.image} />
                    <View style={styles.formContainer}>
                        <TouchableOpacity>
                            <Text style={styles.header}>Login</Text>
                            <TextInput placeholderTextColor='grey' style={styles.form} placeholder='youremail@mail.com' onChangeText={(text) => setEmail(text)} />
                            <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                        </TouchableOpacity>
                        {error && <Feedback level='warn' message={error} />}
                        <Text style={styles.button} onPress={() => onSubmit(email, password)}>💩 💩 💩 Log in! 💩 💩 💩</Text>
                        <View style={styles.navButtons}>
                            <View style={styles.left}>
                                <Button title='Sign Up' onPress={goToRegister} />
                            </View>

                            <View style={styles.right}>
                                <Button title='Continue as Guest' onPress={goToLanding} />
                            </View>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        marginTop: 20
    },
    formContainer: {
        flex: 1,
        width: '90%',
        marginHorizontal: '5%'
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
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
        borderColor: 'grey',
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