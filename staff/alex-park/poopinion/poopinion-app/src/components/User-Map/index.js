import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'

function UserMap({ coordinates, user }) {
    return (<>
        <MapView style={styles.container}
            region={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: coordinates.latitudeDelta,
                longitudeDelta: coordinates.longitudeDelta,
            }}>
            <Marker
                coordinate={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                }}
                title={user ? `This is you, ${user.name}!` : 'This is you!'}
                pinColor={'lightblue'}
            />
        </MapView>
    </>)
}

export default UserMap