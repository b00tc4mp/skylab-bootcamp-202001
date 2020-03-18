import React, { useState } from 'react'
import Feedback from '../Feedback'
import styles from './styles'
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, KeyboardAvoidingView, Image } from 'react-native'

function Login({ onSubmit, error, goToRegister, goToLanding }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <Image source={require('../../../assets/header.png')} style={styles.image} />
                    <View style={styles.formContainer}>
                        <TouchableOpacity>
                            <Text style={styles.header}>Login</Text>
                            <TextInput placeholderTextColor='grey' style={styles.form} placeholder='example@mail.com' onChangeText={(text) => setEmail(text.toLowerCase().trim())} />
                            <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                        </TouchableOpacity>
                        {error && <Feedback level='warn' message={error} />}
                        <TouchableOpacity>
                            <Text style={styles.button} onPress={() => onSubmit(email, password)}>💩 Log in! 💩</Text>
                        </TouchableOpacity>
                        <View style={styles.navButtons}>
                            <TouchableOpacity style={styles.left}>
                                <Text style={styles.leftButton} onPress={goToRegister}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.right}>
                                <Text style={styles.rightButton} onPress={goToLanding} >Continue as Guest</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </>)
}

export default Login