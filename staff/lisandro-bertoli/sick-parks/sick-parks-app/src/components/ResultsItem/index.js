import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import styles from './styles'


export default function ResultsItem(props) {
    const { name, size, resort, verified, rating } = props//park or item
    const { onToPark } = props
    const isVerified = true // will remove later
    return (<>

        <TouchableOpacity style={styles.container} onPress={onToPark}>
            <View style={styles.item}>
                <Image style={styles.image} source={require('../../../assets/logo.png')} />
                <View style={styles.colOne}>
                    <Text style={styles.text}>Name</Text>
                    <Text style={styles.text}>size</Text>
                    <Text style={styles.text}>Resort</Text>
                </View>
                <View style={styles.colTwo}>
                    <Text style={styles[isVerified]}>Verified</Text>
                    <Text style={styles.text}>Rating: 5</Text>
                </View>
            </View>
        </TouchableOpacity>
    </>
    )
}



