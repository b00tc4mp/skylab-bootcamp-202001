import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Button, FlatList} from 'react-native'
import {List, ListItem } from 'react-native-elements'

function Medication ({medication}) {
    //console.log(medication[0].drug.drugName)
    //{`${item.drug.drugName}`}
    //{medication.length ? bablabla : <Text>You don't have medication yet! Do you want to add one?</Text>

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>My medication</Text>
                <Image style={styles.logo} source={require('../../images/pills.png')}/>
                {
                    medication.length > 0 ? 
                        medication.map((item) => (
                            <Text style={styles.drug}>{item.drug.drugName.toString()}</Text>
                        ))
                    :
                    <Text style={styles.text}>You don't have medication yet! Do you want to add one?</Text>
                
                }
                <Image style={styles.plus} source={require('../../images/plus.png')}/>
            </View>
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
    container : {
        //flex : 1,
        marginTop : 100,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 30
    },

    drug : {
        marginTop : 20,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 15,
        borderRadius : 10,
        overflow: 'hidden',
        fontFamily : 'Sensei-Medium'
    },

    text : {
        fontFamily : 'Sensei-Medium',
        color : '#297885',
        padding: 10
    },

    title : {
        fontSize : 40,
        color : '#297885',
        fontFamily : 'Sensei-Medium' ,
        alignSelf : 'center' 
    },

    logo : {
        marginTop : 10,
        width: 150,
        height: 100,
        alignSelf : 'center' ,
        marginBottom : 20  
    },

    plus : {
        marginTop : 30,
        width: 100,
        height: 100,
        alignSelf : 'center' 
    }
})

export default Medication