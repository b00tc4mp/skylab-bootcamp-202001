import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, ShadowPropTypesIOS } from 'react-native';

export default function MapViewContainer({ style, parkLocation, userLocation, _markers, handleNewMarker }) {
    const [location, setLocation] = useState()
    const [error, setError] = useState()
    const [markers, setMarkers] = useState([])


    useEffect(() => {
        try {
            if (parkLocation) setLocation(parkLocation)
            else setLocation(userLocation)
            if (_markers) setMarkers(_markers)
            else setMarkers([])
        } catch ({ message }) {
            setError({ message })
        }
    }, [])

    const sendMakers = (position) => {
        handleNewMarker(position)
    }

    return (
        <View style={styles.container}>
            <MapView showsUserLocation={true} initialRegion={location} style={style || styles.mapStyle} onPress={(e) => {

                setMarkers([...markers, { coordinates: e.nativeEvent.coordinate }])
                sendMakers(e.nativeEvent.coordinate)
            }} >
                {markers && markers.map((marker, index) => {
                    return <Marker
                        coordinate={marker}
                        key={index}
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
        justifyContent: 'flex-end',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.855,
    },
});
