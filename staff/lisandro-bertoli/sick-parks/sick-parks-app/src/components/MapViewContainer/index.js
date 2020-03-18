import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

export default function MapViewContainer({ myPlace, userLocation, markers }) {
    const [location, setLocation] = useState()
    const [error, setError] = useState()


    useEffect(() => {
        try {
            setLocation(userLocation)

        } catch ({ message }) {
            setError({ message })
            console.log(message)

        }
    }, [])



    return (
        <View style={styles.container}>
            <MapView showsUserLocation={true} initialRegion={location} style={styles.mapStyle} >
                {/* {markers.map(marker => {
                    return <Marker
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                })} */}
            </MapView>
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
