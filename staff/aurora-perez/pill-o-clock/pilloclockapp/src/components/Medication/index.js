import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Button, FlatList, TouchableOpacity} from 'react-native'
import {List, ListItem } from 'react-native-elements'
import styles from './styles'

function Medication ({medication, toAdd}) {
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
                        <Image style={styles.logo} source={require('../../../assets/images/pills.png')}/>
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
                <TouchableOpacity onPress={()=>toAdd()}>
                <Image style={styles.plus} source={require('../../../assets/images/plus.png')}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
        
    )
}

export default Medication