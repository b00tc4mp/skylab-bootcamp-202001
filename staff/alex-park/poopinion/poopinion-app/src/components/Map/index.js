import React from 'react'
import { MapView } from 'expo'
import styles from './styles'

function Map({ coordinates }) {
    return (<>
        <MapView style={styles.container}
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

    </>)
}

export default Map