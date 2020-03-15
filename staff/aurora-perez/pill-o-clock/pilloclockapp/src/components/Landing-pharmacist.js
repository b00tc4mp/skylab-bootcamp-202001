import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Button } from 'react-native'

function LandingPharmacist ({user, toPatients}) {
    console.log(user.name)

    return ( 
        <ScrollView>
            <View style={styles.container}>
            <Text style = {styles.text}>Welcome {user.name}!</Text>
            <Image style={styles.logo} source={require('../../images/pharmacist.png')}/>
                <Text style = {[styles.text, styles.button]} onPress={()=> toPatients()}>My patients</Text>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    text : {
        fontFamily : 'Sensei-Medium',
        color : '#297885',
        fontSize : 40,
        alignSelf : 'center'
    },

    container : {
        flex : 1,
        marginTop : 100,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 30
    },

    button : {
        marginTop : 40,
        fontSize : 40,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 25,
        borderRadius : 10,
        overflow: 'hidden'
    },
    logo : {
        marginTop : 50,
        width: 300,
        height: 300,
        alignSelf : 'center'
        
    }
    
})

export default LandingPharmacist