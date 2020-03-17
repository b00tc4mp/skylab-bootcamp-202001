import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'


export default function ResultsItem({ park, onToPark }) {
    const { name, size, resort, verified, rating } = park

    return (<>

        <TouchableOpacity style={styles.container} onPress={onToPark}>
            <View style={styles.item}>
                <Image style={styles.image} source={require('../../../assets/logo.png')} />
                <View style={styles.colOne}>
                    <Text style={styles.textBold}>{name}</Text>
                    <Text style={styles.text}>Size: {size}</Text>
                    <Text style={styles.text}>Resort: {resort}</Text>
                </View>
                <View style={styles.colTwo}>
                    <Text style={styles[verified]}>Verified</Text>
                    <Text style={styles.textBold}>Rating:{rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </>
    )
}



