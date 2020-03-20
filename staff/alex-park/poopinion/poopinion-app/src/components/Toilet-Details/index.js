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
                            {globalRating.scoreMean >= 4.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {globalRating.scoreMean >= 3.5 && globalRating.scoreMean < 4.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {globalRating.scoreMean >= 2.5 && globalRating.scoreMean < 3.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {globalRating.scoreMean >= 1.5 && globalRating.scoreMean < 2.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {globalRating.scoreMean >= 0.5 && globalRating.scoreMean < 1.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {globalRating.scoreMean < 0.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

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
                        <Text style={styles.comments}>Comments ({toilet.comments.length}):</Text>
                        {toilet.comments.length ?
                            (toilet.comments.map(comment => (<>
                                <View>
                                    <Text>Commented by: {comment.publisher.name} {comment.publisher.surname}</Text>
                                </View>
                            </>)))
                            :
                            (<Text>No comments to display...</Text>)}
                    </View>

            </View>
            </View>
    </ScrollView>
    </>)
}

export default ToiletDetails