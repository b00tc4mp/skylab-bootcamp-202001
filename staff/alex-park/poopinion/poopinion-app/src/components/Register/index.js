import React, { useState } from 'react'
import Feedback from '../Feedback'
import styles from './styles'
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, KeyboardAvoidingView } from 'react-native'

function Register({ onSubmit, error, goToLogin, goToLanding }) {
    const [name, setName] = useState()
    const [surname, setSurame] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.formContainer}>
                        <Text style={styles.header}>Register</Text>
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Name' onChangeText={(text) => setName(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Surname' onChangeText={(text) => setSurame(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='example@gmail.com' onChangeText={(text) => setEmail(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Age' onChangeText={(text) => setAge(parseInt(text))} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Gender' onChangeText={(text) => setGender(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                    </TouchableOpacity>
                    {error && <Feedback level='warn' message={error} />}
                    <Text style={styles.button} onPress={() => onSubmit(name, surname, email, password, age, gender)}>💩 Submit! 💩</Text>
                    <View style={styles.navButtons}>
                        <TouchableOpacity style={styles.left}>
                            <Text style={styles.leftButton} onPress={goToLogin}>Go to Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.right}>
                            <Text style={styles.rightButton} onPress={goToLanding} >Continue as Guest</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </>)
}

export default Register