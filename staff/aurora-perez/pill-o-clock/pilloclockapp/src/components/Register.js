import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button, Picker } from 'react-native'


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
            <TouchableOpacity>
                <Text style = {[styles.text, styles.title]}>Register</Text>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Name' onChangeText = {text => setName(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Surname' onChangeText = {text => setSurname(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Gender (F /M /Non-binary)' onChangeText = {text => setGender(text.toLowerCase())}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Age' onChangeText = {text => setAge(parseInt(text))}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Phone number' onChangeText = {text => setPhone(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Profile (patient / Pharmacist)' onChangeText = {text => setProfile(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Email' onChangeText = {text => setEmail(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Password' secureTextEntry={true} onChangeText= {text => setPassword(text)}/>
                
                <Text style = {[styles.text, styles.button]} onPress={()=> onSubmit({name, surname, gender, age, phone, profile, email, password})}>Submit</Text>
            
                <Text style = {[styles.text, styles.toLogin]} onPress={()=>onToLogin()}>Are you already registered? Go to Login!</Text>
           
                {error && <Text style={[styles.text, styles.error]}>{error}</Text>}
            </TouchableOpacity>
            </View>
            
        </ScrollView>

    )
}

//TODO gender, afe, profile

const styles = StyleSheet.create({
    text : {
        fontFamily : 'Sensei-Medium'
    },

    container : {
        flex : 1,
        marginTop : 100,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 30
    },
    
    input : {
        marginTop : 30,
        fontSize : 17
    },

    title : {
        fontSize : 40,
        color : '#297885'
    },

    button : {
        marginTop : 35,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 10,
        borderRadius : 10,
        overflow: 'hidden'
    },

    toLogin : {
        marginTop : 20,
        fontSize : 15,
        alignItems : 'center',
        color : '#79BABF'
    },

    error : {
        marginTop : 20,
        padding : 10
    }

})

export default Register