import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Button, Picker } from 'react-native'
import styles from './styles'

function Register ({onSubmit, onToLogin, error}) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState()
    const [phone, setPhone] = useState('')
    const [profile, setProfile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <ScrollView>
            <View style={styles.container}>
            
                <Text style = {[styles.text, styles.title]}>Register</Text>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Name' onChangeText = {text => setName(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Surname' onChangeText = {text => setSurname(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Gender (female /male /non-binary)' onChangeText = {text => setGender(text.toLowerCase())}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Age' onChangeText = {text => setAge(parseInt(text))}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Phone number' onChangeText = {text => setPhone(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Profile (Patient / Pharmacist)' onChangeText = {text => setProfile(text.toLowerCase())}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Email' onChangeText = {text => setEmail(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Password' secureTextEntry={true} onChangeText= {text => setPassword(text)}/>
                
                <Text style = {[styles.text, styles.button]} onPress={()=> onSubmit({name, surname, gender, age, phone, profile, email, password})}>Submit</Text>
            
                <Text style = {[styles.text, styles.toLogin]} onPress={()=>onToLogin()}>Are you already registered? Go to Login!</Text>
           
                {error && <Text style={[styles.text, styles.error]}>{error}</Text>}
            
            </View>
            
        </ScrollView>

    )
}

//TODO gender, afe, profile


export default Register