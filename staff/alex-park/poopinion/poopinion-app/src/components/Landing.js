import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Button, Dimensions, Image } from 'react-native'
import MapView from 'react-native-maps'
import Marker from 'react-native-maps'

function Landing({ user, lat, lng }) {
    return (<>
        <ScrollView>
            <View style={styles.container}>
                {user && <Text style={styles.header}>Welcome, {user.name} {user.surname}!! Enjoy your pooping 🚽</Text>}
                {!user && <Text style={styles.header}>Welcome, stranger pooper!! Enjoy your pooping 🚽</Text>}
                <Text>Your current position is: </Text>
                <MapView style={styles.mapStyle}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.001922,
                        longitudeDelta: 0.000821,
                    }}>
                    <MapView.Marker coordinate={{
                        latitude: lat,
                        longitude: lng
                    }} />
                </MapView>

                <View style={styles.posts}>
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                    <Image style={styles.post} source={require('../../assets/placeholder.jpg')} />
                </View>
            </View>
        </ScrollView>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        marginTop: 0,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    posts: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    post: {
        width: '45%',
        margin: 10
    },
    mapStyle: {
        width: '95%',
        height: 175,
        marginVertical: 25
    },
})

export default Landing