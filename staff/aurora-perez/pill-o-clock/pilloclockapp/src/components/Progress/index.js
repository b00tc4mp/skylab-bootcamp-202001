import React, {useState} from 'react'
import { View, Text, ScrollView, Image, Button, TouchableOpacity} from 'react-native'
import styles from './styles'

function Progress () {

    return (<>
        
        <ScrollView >
            <View style={styles.container}>
                <View style ={styles.titleContainer}>
                    <View style={styles.titleLeft}>
                        <Text style={styles.titleText}>My Progress</Text>
                    </View>
                    <View style={styles.titleRight}>
                        <Image style={styles.logo} source={require('../../../assets/images/calendar.jpg')}/>
                    </View>
                </View>
            </View>
        </ScrollView>
        
        
    </>)
}

export default Progress