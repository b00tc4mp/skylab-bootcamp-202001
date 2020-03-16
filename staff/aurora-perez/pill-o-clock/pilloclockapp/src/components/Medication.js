import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Button, FlatList} from 'react-native'
import {List, ListItem } from 'react-native-elements'

function Medication ({medication}) {
    //console.log(medication[0].drug.drugName)
    //{`${item.drug.drugName}`}
    //{medication.length ? bablabla : <Text>You don't have medication yet! Do you want to add one?</Text>

    return (
        <View style={{width : '100%'}}>
        <ScrollView>
            <View style={styles.container}>

                <View style ={styles.titleContainer}>
                    <View style={styles.titleLeft}>
                        <Text style={styles.title}>My medication</Text>
                    </View>
                    <View style={styles.titleRight}>
                        <Image style={styles.logo} source={require('../../images/pills.png')}/>
                    </View>
                </View>
                
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
        </View>
        
    )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '80%',
        marginHorizontal: '10%',
        marginTop : 100,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 0
    },

    titleContainer : {
        flex : 1,
        flexDirection : 'row',
    },

    titleLeft : {
        flex : 1,
        justifyContent: 'center'
    },

    titleRight : {
        flex : 0.4
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
        fontSize : 30,
        color : '#297885',
        fontFamily : 'Sensei-Medium' ,
        alignSelf : 'center' 
    },

    logo : {
        marginTop : 10,
        width: 80,
        height: 80,
        resizeMode : 'contain',
        alignSelf : 'center' ,
        marginBottom : 20  
    },

    plus : {
        margin : 20,
        width: 70,
        height: 70,
        alignSelf : 'center' 
    }
})

export default Medication