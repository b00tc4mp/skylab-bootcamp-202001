import React, { useState } from 'react'
import Feedback from './Feedback'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, Image } from 'react-native'

function Register({ onSubmit, error, goToLogin, goToLanding }) {
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
                <TouchableOpacity style={styles.formContainer}>
                    <TextInput style={styles.form} placeholder='Name' onChangeText={(text) => setName(text)} />
                    <TextInput style={styles.form} placeholder='Surname' onChangeText={(text) => setSurame(text)} />
                    <TextInput style={styles.form} placeholder='example@gmail.com' onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.form} placeholder='Age' onChangeText={(text) => setAge(parseInt(text))} />
                    <TextInput style={styles.form} placeholder='Gender' onChangeText={(text) => setGender(text)} />
                    <TextInput style={styles.form} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                </TouchableOpacity>
                {error && <Feedback level='warn' message={error}/>}
                <Text style={styles.button} onPress={() => onSubmit(name, surname, email, password, age, gender)}>💩 💩 💩 Submit 💩 💩 💩</Text>
                <View style={styles.navButtons}>
                    <View style={styles.left}>
                        <Button title='Go to login' onPress={goToLogin} />
                    </View>

                    <View style={styles.right}>
                        <Button title='Continue as Guest' onPress={goToLanding} />
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
    form: {
        fontSize: 20
    },
    error: {
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    },
    navButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    form: {
        fontSize: 20,
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: 'lightgrey',
        borderRadius: 10
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
        fontSize: 20
    },
    left: {
        flex: 1,
        marginHorizontal: 10
    }
})

export default Register