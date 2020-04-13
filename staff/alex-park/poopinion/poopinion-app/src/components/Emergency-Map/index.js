import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, ScrollView, Slider, Text, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import moment from 'moment'

const newWidth = Dimensions.get('window').width

function EmergencyMap({ coordinates, topToilets, onDetails, user }) {
    const [radius, setRadius] = useState(400)
    const [score, setScore] = useState(0)

    useEffect(() => { }, [radius])
    useEffect(() => { }, [score])

    return (<>
        <ScrollView>

            <SafeAreaView style={styles.container}>
                <MapView style={styles.mapStyle}
                    region={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015,
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
                    />

                    {topToilets && topToilets.map(toilet => (<>
                        {toilet.score > score && (<>
                            <MapView.Marker
                                coordinate={{
                                    latitude: toilet.geolocation.latitude,
                                    longitude: toilet.geolocation.longitude,
                                }}
                            >
                                <MapView.Callout onPress={() => onDetails(toilet.id.toString())}>
                                    <View style={{ width: 200, height: 200 }}>
                                        <Text style={{ textAlign: 'center' }}>
                                            <Image
                                                source={{ uri: toilet.image }}
                                                style={{ flex: 1, width: newWidth * 0.18, height: newWidth * 0.18, margin: 0 }}
                                            />
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}>{toilet.place}</Text>
                                        <Text><Text style={{ fontWeight: 'bold' }}>Publisher</Text>: {toilet.publisher.name} {toilet.publisher.surname}</Text>
                                        <Text><Text style={{ fontWeight: 'bold' }}>Published at</Text>: {moment(toilet.created).fromNow()}</Text>
                                        <Text><Text style={{ fontWeight: 'bold' }}>Score</Text>: {toilet.score} ({toilet.comments.length})</Text>
                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
                        </>)}
                    </>))}
                </MapView>

                <View style={styles.buttonContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={(event) => {
                            event.preventDefault()
                            setRadius(200)
                        }}
                            style={{ marginHorizontal: 5 }}>
                            <Text style={[styles.button, styles.danger]}>S</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(event) => {
                            event.preventDefault()
                            setRadius(400)
                        }}
                            style={{ marginHorizontal: 5 }}>
                            <Text style={[styles.button, styles.warning]}>M</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(event) => {
                            event.preventDefault()
                            setRadius(600)
                        }}
                            style={{ marginHorizontal: 5 }}>
                            <Text style={[styles.button, styles.safe]}>L</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>Minimum Score</Text>
                        <View style={styles.sliderContainer}>
                            <Text>0</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={5}
                                onValueChange={(value) => setScore(parseInt(value))}
                            />
                            <Text>5</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    </>)
}

export default EmergencyMap