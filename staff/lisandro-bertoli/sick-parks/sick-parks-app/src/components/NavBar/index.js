import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

export default function ({ onToProfile, onToMapView, onToSearch, onToCreatePark }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={onToSearch}>
                <Image source={require('../../../assets/icon-search.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={onToMapView}>
                <Image source={require('../../../assets/icon-location.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={onToCreatePark}>
                <Image source={require('../../../assets/icon-pick-and-shovel.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={onToProfile}>
                <Image source={require('../../../assets/icon-profile.png')} style={styles.icon} />
            </TouchableOpacity>

        </View>
    )
}

