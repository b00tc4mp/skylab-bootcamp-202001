import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, ScrollView, Slider, Text, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import moment from 'moment'
import { isPointWithinRadius } from 'geolib'

function EmergencyMap({ coordinates, topToilets, onDetails, user }) {
    const [radius, setRadius] = useState(400)
    const [score, setScore] = useState(0)
    const [zoom, setZoom] = useState(0.010)

    useEffect(() => { }, [radius])
    useEffect(() => { }, [score])

    return (<>
        <ScrollView>

            <SafeAreaView style={styles.container}>
                <MapView style={styles.mapStyle}
                    region={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: zoom,
                        longitudeDelta: zoom,
                    }}>

                    <MapView.Circle
                        center={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
                        radius={radius}
                        strokeWidth={1}
                        strokeColor={'#1a66ff'}
                        fillColor={'rgba(230,238,255,0.6)'}
                    />

                    <MapView.Marker
                        coordinate={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude
                        }}
                        title={user ? `This is you, ${user.name}!` : 'This is you!'}
                        pinColor={'lightblue'}
                    />

                    {topToilets && topToilets.map(toilet => (<>
                        {isPointWithinRadius({ latitude: coordinates.latitude, longitude: coordinates.longitude },
                            { latitude: toilet.geolocation.latitude, longitude: toilet.geolocation.longitude },
                            radius) && toilet.score > score && (<>
                                <MapView.Marker
                                    coordinate={{
                                        latitude: toilet.geolocation.latitude,
                                        longitude: toilet.geolocation.longitude,
                                    }}
                                >
                                    <MapView.Callout onPress={() => onDetails(toilet.id.toString())}>
                                        <View style={styles.calloutContainer}>
                                            <Text style={styles.centerText}>
                                                <Image
                                                    source={{ uri: toilet.image }}
                                                    style={styles.calloutImage}
                                                />
                                            </Text>
                                            <Text style={styles.calloutTitle}>{toilet.place}</Text>
                                            <Text><Text style={styles.bold}>Publisher</Text>: {toilet.publisher.name} {toilet.publisher.surname}</Text>
                                            <Text><Text style={styles.bold}>Published at</Text>: {moment(toilet.created).fromNow()}</Text>
                                            <Text><Text style={styles.bold}>Score</Text>: {toilet.score} ({toilet.comments.length})</Text>
                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                            </>)}
                    </>))}
                </MapView>

                <View style={styles.buttonContainer}>
                    <View style={styles.radiusLength}>
                        <TouchableOpacity onPress={(event) => {
                            event.preventDefault()
                            setZoom(0.005)
                            setRadius(200)
                        }}
                            style={styles.buttonMargin}>
                            <Text style={styles.button}>S</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(event) => {
                            event.preventDefault()
                            setZoom(0.010)
                            setRadius(400)
                        }}
                            style={styles.buttonMargin}>
                            <Text style={styles.button}>M</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(event) => {
                            event.preventDefault()
                            setZoom(0.015)
                            setRadius(600)
                        }}>
                            <Text style={styles.button}>L</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.bold}>Minimum Score ({parseFloat(score.toFixed(2))})</Text>
                        <View style={styles.sliderContainer}>
                            <Text>0</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={5}
                                onValueChange={(value) => setScore(parseFloat(value))}
                            />
                            <Text>5</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.windowInfo}>
                    <Text style={styles.textInfo}>{`This is the Emergency Map! Use this to find nearby toilets based on the level of your emergency (smaller/bigger radius) and the mean score of said toilets.\n\nYou can click on the markers to find info about the toilet and click on it go to the toilet post`}</Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    </>)
}

export default EmergencyMap