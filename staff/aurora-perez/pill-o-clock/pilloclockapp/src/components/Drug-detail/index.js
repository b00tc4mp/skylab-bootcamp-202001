import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, Button, TouchableOpacity} from 'react-native'
import styles from './styles'

function DrugDetail ({drugDetail, times, toDelete }){
    const {drugName, _id, description} = drugDetail
    
    return (
        <View style = {styles.container}>
            <View style={styles.headerContainer}>
                <Text style ={styles.title}>{drugName}</Text>
                    <TouchableOpacity style={styles.bin} onPress={()=>toDelete({_id})}>
                        <Image style={styles.logoBin} source={require('../../../assets/images/bin.png')}/>
                    </TouchableOpacity>
            </View>
            <Text style ={styles.header}>Description: </Text> 
                <Text style ={styles.text}>{description}</Text>
                
                    <Text style ={styles.header}>Alarm at: </Text>
                    {times.length && 
                        times.map(time => {
                            if (time.toString().length === 3) {
                                time=`0${time}`
                            } else {
                                time = time.toString()
                            }
                            time = (time.slice(0, time.length-2) + ':' + time.slice(time.length-2, time.length))
                            return (<Text style ={styles.text} >{time}</Text>)
                        })
                    }
            <Image style={styles.logo} source={require('../../../assets/images/pill-and-clock.png')}/>  
        </View>
   )
}

export default DrugDetail