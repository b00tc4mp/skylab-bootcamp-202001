import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import MapView from 'react-native-maps'
import styles from './styles'

function ToiletDetails({ toilet, globalRating, user, onFav }) {
    return (<>
        <ScrollView >
            <View style={styles.container}>
                {toilet.image ? (<Image style={styles.image} source={{ uri: toilet.image }} />)
                    :
                    (<Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />)}
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.place}>{toilet.place}</Text>
                            <Text style={styles.rating}>💩💩💩💩💩 ({toilet.comments.length})</Text>
                            <Text style={styles.postedAt}>Posted at: {toilet.created.toString().slice(0, 10)}, by {toilet.publisher.name} {toilet.publisher.surname}</Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight} onPress={() => { onFav(toilet.id) }}>
                            {user && toilet.isFavedBy.includes(user.id) ?
                                (<Image style={styles.favButton} source={require('../../../assets/faved.png')} />)
                                :
                                (<Image style={styles.favButton} source={require('../../../assets/fav.png')} />)
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.score}>Score:</Text>
                        <View style={styles.allScoreInfo}>
                            <View style={styles.scoreLeft}>
                                <Text style={styles.scoreLeftUp}>
                                    <Text style={styles.scoreMean}>{globalRating.scoreMean}</Text>
                                </Text>
                                <TouchableOpacity style={styles.scoreLeftDown} onPress={() => Alert.alert(`rating to ${toilet.id}`)}>
                                    <Text style={styles.addRating}>+ Add a rating</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.scoreRight}>
                                <Text>Cleanness: <Text>{globalRating.cleannessMean}</Text></Text>
                                <Text>Aesthetics: {globalRating.looksMean}</Text>
                                <Text>Payment required: {globalRating.paymentMean >= 0.5 ? (<Text>Yes</Text>) : (<Text>No</Text>)}</Text>
                                <Text>Multiple toilets: {globalRating.multipleMean >= 0.5 ? (<Text>Yes</Text>) : (<Text>No</Text>)}</Text>
                                <Text>Paper provision: {globalRating.paperMean >= 0.5 ? (<Text>Yes</Text>) : (<Text>No</Text>)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mapContainer}>
                        <Text style={styles.location}>Location:</Text>
                        <MapView style={styles.mapStyle}
                            region={{
                                latitude: toilet.geolocation.latitude,
                                longitude: toilet.geolocation.longitude,
                                latitudeDelta: toilet.geolocation.latitudeDelta,
                                longitudeDelta: toilet.geolocation.longitudeDelta,
                            }}>
                            <MapView.Marker coordinate={{
                                latitude: toilet.geolocation.latitude,
                                longitude: toilet.geolocation.longitude
                            }} />
                        </MapView>
                    </View>

                    <View style={styles.commentsContainer}>
                        <Text style={styles.comments}>Comments:</Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    </>)
}

export default ToiletDetails

// useEffect(() => {
//     let meanRating= {cleannessMean: 0, looksMean: 0, paymentMean: 0, multipleMean: 0, scoreMean: 0, paperMean: 0}

//     toilet.comments.forEach(comment => {
//         meanRating.cleannessMean += comment.rating.cleanness
//         meanRating.looksMean += comment.rating.looks
//         meanRating.paymentMean += comment.rating.paymentRequired
//         meanRating.multipleMean += comment.rating.multipleToilets
//         meanRating.paperMean += comment.rating.paperDeployment
//         meanRating.scoreMean += comment.rating.overallRating
//     })

//     for (const key in meanRating) {
//         meanRating[key] = meanRating[key]/toilet.comments.length
//     }
//     console.log(meanRating)
//     setGlobalRating(meanRating)
// })