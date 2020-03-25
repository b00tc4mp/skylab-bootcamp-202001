import React, { useState, useEffect } from 'react'
import Feedback from '../Feedback'
import styles from './styles'
import { View, Text, TextInput, TouchableOpacity, Picker, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'

function UpdateUser({ onSubmit, error, goToLanding, user }) {
    const [name, setName] = useState(user.name)
    const [surname, setSurame] = useState(user.surname)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [newPassword, setNewPassword] = useState('')
    const [password, setPassword] = useState()

    useEffect(() => {
        setName(user.name)
        setSurame(user.surname)
        setAge(user.age)
        setGender(user.gender)
    }, [])

    return (<>
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text>Hi {user.name}! You can update your profile here. Feel free to change your info but please stay away from putting anything offensive. Thank you! 💩</Text>
                        <Text style={styles.header}>Update</Text>
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder={`Name (current: ${user.name})`} onChangeText={(text) => setName(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder={`Surname (current: ${user.surname})`} onChangeText={(text) => setSurame(text)} />
                        <TextInput placeholderTextColor='grey' keyboardType={'numeric'} style={styles.form} placeholder={`Age (current: ${user.age})`} onChangeText={(text) => setAge(parseInt(text))} />
                        <View style={styles.form}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue) =>
                                    setGender(itemValue)
                                }>
                                <Picker.Item style={styles.form} label="Male" value="male" />
                                <Picker.Item style={styles.form} label="Female" value="female" />
                                <Picker.Item style={styles.form} label="Non-binary" value="non-binary" />
                            </Picker>

                        </View>
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='New password (optional)' secureTextEntry={true} onChangeText={(text) => setNewPassword(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                    </View>
                    {error && <Feedback level='warn' message={error} />}
                    <Text style={styles.button} onPress={() => onSubmit({name, surname, age, newPassword, password, gender})}>💩 Submit! 💩</Text>

                    <TouchableOpacity style={styles.right}>
                        <Text style={styles.rightButton} onPress={goToLanding} >Go back</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    </>)
}

export default UpdateUser