import React, { useState } from 'react'
import styles from './styles'
import { View, Text, TextInput } from 'react-native'

let query

function NavigationBarTop({ goToLogin, onSubmit }) {
    return (<>
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.logout} onPress={goToLogin}>Logout</Text>
                <TextInput style={styles.query} placeholder='Search a toilet' onChangeText={(text) => query = text} />
                <Text style={styles.search} onPress={() =>{
                    onSubmit(query)
                    
                }}>Search</Text>
            </View>
        </View>
    </>)
}

export default NavigationBarTop