import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, Image } from 'react-native'

function Register({ onSubmit, error, goToLogin }) {
    const [name, setName] = useState()
    const [surname, setSurame] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Register</Text>
                <TouchableOpacity>
                    <TextInput placeholder='Name' onChangeText={(text) => setName(text)} />
                    <TextInput placeholder='Surname' onChangeText={(text) => setSurame(text)} />
                    <TextInput placeholder='example@gmail.com' onChangeText={(text) => setEmail(text)} />
                    <TextInput placeholder='Age' onChangeText={(text) => setAge(parseInt(text))} />
                    <TextInput placeholder='Gender' onChangeText={(text) => setGender(text)} />
                    <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                </TouchableOpacity>
                {error && <Text style={styles.error}>{error}</Text>}
                <Button title='Submit' onPress={() => onSubmit(name, surname, email, password, age, gender)} />
                <Text onPress={goToLogin} style={styles.anchor}>Go back to login</Text>
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
    anchor: {
        color: 'blue',
        fontWeight: 'bold',
        marginVertical: 20
    }
})

export default Register