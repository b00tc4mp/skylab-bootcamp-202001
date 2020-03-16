import React from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native'

function QueryResults({ query }) {

    return (<>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Results for: '{query}'</Text>
            </View>
        </ScrollView>
    </>)
}

export default QueryResults