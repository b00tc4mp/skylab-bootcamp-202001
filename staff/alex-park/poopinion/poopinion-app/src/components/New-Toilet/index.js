import React, { useState } from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, TextInput } from 'react-native'
import MapView from 'react-native-maps'

let place

function NewToilet({ coordinates, onSubmit }) {
    return (<>
        <ScrollView style={styles.container}>

            <Text style={styles.header}>New Toilet Post</Text>

            <View style={styles.locationContainer}>
                <Text style={styles.locationHeader}>Location:</Text>
                <MapView style={styles.mapStyle}
                    region={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: coordinates.latitudeDelta,
                        longitudeDelta: coordinates.longitudeDelta,
                    }}>
                    <MapView.Marker coordinate={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude
                    }} />
                </MapView>
            </View>

            <View style={styles.uploadInfo}>
                <View style={styles.place}>
                    <Text style={styles.placeName}>Place: </Text>
                    <TextInput style={styles.placeInput} placeholder='insert the place here' onChangeText={(text) => place = text} />
                </View>

                <Text style={styles.options}>More options...</Text>
            </View>

            <TouchableOpacity >
                <Text style={styles.submitButton}>💩 Submit! 💩</Text>
            </TouchableOpacity>
        </ScrollView>
    </>)
}

export default NewToilet