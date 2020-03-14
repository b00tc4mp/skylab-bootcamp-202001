import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button } from 'react-native'


function Register ({onSubmit}) {
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
                <Text style = {styles.title}>Register</Text>
                <TextInput style = {styles.input} placeholder= 'Name' onChangeText = {text => setName(text)}/>
                <TextInput style = {styles.input} placeholder= 'Surname' onChangeText = {text => setSurname(text)}/>
                <TextInput style = {styles.input} placeholder= 'Gender' onChangeText = {text => setGender(text)}/>
                <TextInput style = {styles.input} placeholder= 'Age' onChangeText = {text => setAge(parseInt(text))}/>
                <TextInput style = {styles.input} placeholder= 'Phone number' onChangeText = {text => setPhone(text)}/>
                <TextInput style = {styles.input} placeholder= 'Email' onChangeText = {text => setEmail(text)}/>
                <TextInput style = {styles.input} placeholder= 'Password' onChangeText= {text => setPassword(text)}/>
                <Button title= 'Submit' onPress={()=> onSubmit({name, surname, gender, age, phone, profile, email, password})}/>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

//TODO gender, afe, profile

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : 100,
    },
    
    input : {
        marginTop : 20

    },

    title : {
        fontSize : 40,
    }
})

export default Register