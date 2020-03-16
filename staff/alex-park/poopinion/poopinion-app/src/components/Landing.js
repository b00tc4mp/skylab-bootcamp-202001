import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Button, Dimensions, Image } from 'react-native'
import MapView from 'react-native-maps'
import Marker from 'react-native-maps'

function Landing({ user, lat, lng }) {
    return (<>
        <ScrollView>
            <View style={styles.container}>
                {user && <Text style={styles.header}>Welcome, {user.name} {user.surname}!! Enjoy your pooping 🚽</Text>}
                {!user && <Text style={styles.header}>Welcome, stranger pooper!! Enjoy your pooping 🚽</Text>}
                <Text>Your current position is: </Text>
                <MapView style={styles.mapStyle}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.001922,
                        longitudeDelta: 0.000821,
                    }}>
                    <MapView.Marker coordinate={{
                        latitude: lat,
                        longitude: lng
                    }} />
                </MapView>

                <View style={styles.topToilets}>
                    <Text style={styles.bold}>Top Toilets</Text>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text>Skylab Coders Academy</Text>
                                <Text>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text>Skylab Coders Academy</Text>
                                <Text>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text>Skylab Coders Academy</Text>
                                <Text>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text>Skylab Coders Academy</Text>
                                <Text>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text>Skylab Coders Academy</Text>
                                <Text>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text>Skylab Coders Academy</Text>
                                <Text>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    topToilets: {
        flex: 1,
        alignSelf: 'baseline',
        marginLeft: '2.5%'
    },
    bold: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    posts: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    post: {
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: '4%'
    },
    postImage: {
        width: '100%'
    },
    postContent: {
        flex: 1,
        flexDirection: 'row'
    },
    contentRight: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    mapStyle: {
        width: '95%',
        height: 150,
        marginVertical: 10
    },
})

export default Landing