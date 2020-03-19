import React, {useState} from 'react'
import { View, Text, ScrollView, Image, Button, TouchableOpacity} from 'react-native'
import styles from './styles'

function Contacts ({toAdd}) {

    return (<>
        
        <ScrollView >
            <View style={styles.container}>
                <View style ={styles.titleContainer}>
                    <View style={styles.titleLeft}>
                        <Text style={styles.titleText}>My Contacts</Text>
                    </View>
                    <View style={styles.titleRight}>
                        <Image style={styles.logo} source={require('../../../assets/images/contacts.png')}/>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>toAdd()}>
                    <Image style={styles.plus} source={require('../../../assets/images/plus.png')}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
        
    </>)
}

export default Contacts