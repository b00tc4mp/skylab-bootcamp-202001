import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button } from 'react-native'


function Login ({onSubmit, toRegister, error}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <ScrollView>
            <View style={styles.container}>
            <TouchableOpacity>
        
                <Text style = {[styles.text, styles.title]}>Login</Text>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Email' onChangeText = {text => setEmail(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Password' secureTextEntry={true} onChangeText= {text => setPassword(text)}/>
                <Text style = {[styles.text, styles.button]} onPress={()=> onSubmit({email, password})}>Submit</Text>
                <Text style = {[styles.text, styles.toRegister]} onPress={()=>toRegister()}>Are you not registered yet? Go to Register!</Text>
           
                {error && <Text style={styles.error}>{error}</Text>}
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    text : {
        fontFamily : 'Sensei-Medium'
    },

    container : {
        flex : 1,
        marginTop : 100,
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
        color : '#297885'
    },

    toRegister : {
        marginTop : 20,
        fontSize : 15,
        alignItems : 'center',
        color : '#79BABF'
    },

    error : {
        marginTop : 20
    }
})

export default Login