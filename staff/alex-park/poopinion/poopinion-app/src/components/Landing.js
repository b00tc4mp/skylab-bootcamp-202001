import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'

function Landing ({ user, goToLogin, lat, lng }) {
    return ( <>
        <ScrollView>
            <View style={styles.container}>
                { user && <Text style={styles.header}>Welcome, {user.name} {user.surname}!! Enjoy your pooping 🚽</Text> }
                { !user && <Text style={styles.header}>Welcome, stranger pooper!! Enjoy your pooping 🚽</Text> }
                <Text>Your current position is: </Text>
                <Text>Latitude: {lat}</Text>
                <Text>Longitude: {lng}</Text>
                <Button title='Go to login' onPress={goToLogin} />
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
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Landing