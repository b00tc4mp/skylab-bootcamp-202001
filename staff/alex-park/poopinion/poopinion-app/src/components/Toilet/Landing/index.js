import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import styles from './styles'
import { Post } from '../'
import { LocationMap } from '../../Geolocation'
import { Contact } from '../../'

function Landing({ user, coordinates, topToilets, onFav, onDetails }) {
    const [topTen, setTopTen] = useState(topToilets.slice(0, 10))

    useEffect(() => {
        setTopTen(topToilets.slice(0, 10))
    }, [topToilets])

    return (<>
        <ScrollView>
            <View style={styles.container}>
                {user ? (<Text style={styles.topHeader}>Welcome, {user.name} {user.surname}!! Enjoy your pooping 🚽</Text>)
                    :
                    (<Text style={styles.topHeader}>🚽 Welcome, stranger!! Enjoy your pooping 🚽</Text>)}
                <Text>Your current position is: </Text>

                {coordinates.latitude && coordinates.longitude && (<>
                    <View style={styles.mapContainer}>
                        <LocationMap target={coordinates} user={user} />
                    </View>
                </>)}

                <View style={styles.topToilets}>
                    <Text style={styles.bold}>Top Toilets</Text>
                </View>

                {topTen.length > 0 && topTen.map((toilet, index) => (<>
                    <Post user={user} toilet={toilet} onDetails={onDetails} onFav={onFav} />
                </>))}

            </View>

            <View>
                <Contact />
            </View>
        </ScrollView>
    </>)
}

export default Landing