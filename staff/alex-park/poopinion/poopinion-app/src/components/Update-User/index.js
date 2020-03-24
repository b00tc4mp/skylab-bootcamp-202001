import React, { useState } from 'react'
import Feedback from '../Feedback'
import styles from './styles'
import { View, Text, TextInput, TouchableOpacity, Picker, ScrollView, KeyboardAvoidingView } from 'react-native'

function UpdateUser({ onSubmit, error, goToLanding }) {
    const [name, setName] = useState()
    const [surname, setSurame] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState('male')
    const [password, setPassword] = useState()

    return (<>
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.formContainer}>
                        <Text style={styles.header}>Update</Text>
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Name' onChangeText={(text) => setName(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='Surname' onChangeText={(text) => setSurame(text)} />
                        <TextInput placeholderTextColor='grey' style={styles.form} placeholder='example@mail.com' onChangeText={(text) => setEmail(text.toLowerCase().trim())} />
                        <TextInput placeholderTextColor='grey' keyboardType={'numeric'} style={styles.form} placeholder='Age' onChangeText={(text) => setAge(parseInt(text))} />
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

export default UpdateUser