import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'


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

const styles = StyleSheet.create({
    container: {
        height: '8%',
        backgroundColor: '#82A4B3',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        margin: 0,
        padding: 0
    },
    iconContainer: {

        width: 30,
        height: 30,

    },

})