import React from 'react'
import { View, Text } from 'react-native'
import MyButton from '../Button'
import styles from './styles'

export default function ({ feature }) {
    return (<View style={styles.container}>
        <View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 15 }}>
            <MyButton text='✖' />
        </View>

        <View style={styles.featureContainer} >
            <View style={styles.propContainer}>
                <Text style={styles.featureProp}>Type</Text>
                <Text style={styles.featureData}>{feature.name}</Text>
            </View>
            <View style={styles.propContainer}>
                <Text style={styles.featureProp}>Size</Text>
                <Text style={styles.featureData}>{feature.size.toUpperCase()}</Text>
            </View>
            <View style={styles.propContainer}>
                <Text style={styles.featureProp}>Description</Text>
                <Text style={styles.featureData}>{feature.description}</Text>
            </View>

        </View >
    </View>
    )
}