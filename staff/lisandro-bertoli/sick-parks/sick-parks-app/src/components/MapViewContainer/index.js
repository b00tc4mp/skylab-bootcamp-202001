import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';

export default function MapViewContainer() {
    const [location, setLocation] = useState()
    const [error, setError] = useState()

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         const location = JSON.stringify(position);

    //         setLocation({ location });
    //     },
    //         error => Alert.alert(error.message),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     )
    // }, [])
    async function allowUserNotifications() { // Before should call getAsync because maybe permissions where already granted
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            alert('Hey! You might want to enable notifications for my app, they are good.');
        }
    }

    async function getLocationAsync() {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            setLocation({ location })
        } else {
            setError({ message: 'Location permissions not granted' })
        }
    }

    return (
        <View style={styles.container}>
            <MapView showsUserLocation={true} style={styles.mapStyle} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
