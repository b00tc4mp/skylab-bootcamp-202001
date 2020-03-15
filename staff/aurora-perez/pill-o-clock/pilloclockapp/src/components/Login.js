import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Button } from 'react-native'


function Login ({onSubmit, toRegister, error}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <ScrollView>
        <Image style={styles.logo} source={require('../../images/logo.png')}/>
            <View style={styles.container}>
            
                <Text style = {[styles.text, styles.title]}>Login</Text>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Email' onChangeText = {text => setEmail(text)}/>
                <TextInput style = {[styles.text, styles.input]} placeholder= 'Password' secureTextEntry={true} onChangeText= {text => setPassword(text)}/>
                <Text style = {[styles.text, styles.button]} onPress={()=> onSubmit({email, password})}>Submit</Text>
                <Text style = {[styles.text, styles.toRegister]} onPress={()=>toRegister()}>Are you not registered yet? Go to Register!</Text>
           
                {error && <Text style={[styles.text, styles.error]}>{error}</Text>}
            
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
        //marginTop : 100,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 10
    },
    
    input : {
        marginTop : 30,
        fontSize : 17,
        alignSelf : 'center'
    },

    title : {
        fontSize : 50,
        color : '#297885',
        alignSelf : 'center'
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

    toRegister : {
        marginTop : 20,
        fontSize : 15,
        alignSelf : 'center',
        color : '#79BABF'
    },

    error : {
        marginTop : 20,
        padding : 10
    },

    logo : {
        marginTop : 50,
        width: 350,
        height: 350,
        alignSelf : 'center'
        
    }
})

export default Login