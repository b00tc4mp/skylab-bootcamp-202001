import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

export default function MapViewContainer({ myPlace, userLocation, _markers, getMarkers }) {
    const [location, setLocation] = useState()
    const [error, setError] = useState()
    const [markers, setMarkers] = useState([])



    useEffect(() => {
        try {
            setLocation(userLocation)
            if (_markers) setMarkers(_markers)
            else setMarkers([])
        } catch ({ message }) {
            setError({ message })
            console.log(message)

        }
    }, [])

    const sendMakers = (position) => {
        getMarkers(position)
    }



    return (
        <View style={styles.container}>
            <MapView showsUserLocation={true} initialRegion={location} style={styles.mapStyle} onPress={(e) => {

                setMarkers([...markers, { coordinate: e.nativeEvent.coordinate }])
                sendMakers(e.nativeEvent.coordinate)
            }} >
                {markers && markers.map(marker => {
                    return <Marker
                        coordinate={marker.coordinate}
                    />
                })}
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
