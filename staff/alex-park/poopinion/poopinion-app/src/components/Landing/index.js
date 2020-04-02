import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import MapView from 'react-native-maps'
import styles from './styles'
import moment from 'moment'

function Landing({ user, coordinates, topToilets, onFav, onDetails }) {
    const [topTen, setTopTen] = useState(topToilets.slice(0, 10))
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTopTen(topToilets.slice(0, 10))
    }, [topToilets])

    return (<>
        <ScrollView>
            <View style={styles.container}>
                {user && <Text style={styles.topHeader}>Welcome, {user.name} {user.surname}!! Enjoy your pooping 🚽</Text>}
                {!user && <Text style={styles.topHeader}>🚽 Welcome, stranger!! Enjoy your pooping 🚽</Text>}
                <Text>Your current position is: </Text>
                {coordinates.latitude && coordinates.longitude &&
                    <MapView style={styles.mapStyle}
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
                    </MapView>}

                <View style={styles.topToilets}>
                    <Text style={styles.bold}>Top Toilets</Text>
                </View>

                {topTen.length > 0 && topTen.map((toilet, index) => (<>
                    <View style={styles.posts} key={index}>
                        <View style={styles.post} key={index}>
                            {toilet.image ? (<>
                                <TouchableHighlight  activeOpacity={0.5} onPress={() => {
                                    setLoading(true)
                                    onDetails(toilet.id)
                                }}>
                                    <Image style={styles.image} source={{ uri: toilet.image }} />
                                </TouchableHighlight>
                            </>)
                                :
                                (<>
                                    <TouchableHighlight  activeOpacity={0.5} onPress={() => {
                                        setLoading(true)
                                        onDetails(toilet.id)
                                    }}>
                                        <Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />
                                    </TouchableHighlight>
                                </>)}
                            <View style={styles.postContent}>
                                <View style={styles.header}>
                                    <View style={styles.headerLeft}>
                                        <Text style={styles.place}>{toilet.place} ({toilet.score === null ? (<Text>0</Text>) : <Text>{toilet.score}</Text>})</Text>
                                        {toilet.score >= 4.5 && (<>
                                            <View style={styles.poopRating}>
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Text style={styles.rating}>({toilet.comments.length})</Text>
                                            </View>
                                        </>)}

                                        {toilet.score >= 3.5 && toilet.score < 4.5 && (<>
                                            <View style={styles.poopRating}>
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Text style={styles.rating}>({toilet.comments.length})</Text>
                                            </View>
                                        </>)}

                                        {toilet.score >= 2.5 && toilet.score < 3.5 && (<>
                                            <View style={styles.poopRating}>
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Text style={styles.rating}>({toilet.comments.length})</Text>
                                            </View>
                                        </>)}

                                        {toilet.score >= 1.5 && toilet.score < 2.5 && (<>
                                            <View style={styles.poopRating}>
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Text style={styles.rating}>({toilet.comments.length})</Text>
                                            </View>
                                        </>)}

                                        {toilet.score >= 0.5 && toilet.score < 1.5 && (<>
                                            <View style={styles.poopRating}>
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Text style={styles.rating}>({toilet.comments.length})</Text>
                                            </View>
                                        </>)}

                                        {toilet.score < 0.5 && (<>
                                            <View style={styles.poopRating}>
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                                <Text style={styles.rating}>({toilet.comments.length})</Text>
                                            </View>
                                        </>)}

                                        <Text style={styles.postedAt}>Posted {moment(toilet.created).fromNow()}, by {toilet.publisher.name} {toilet.publisher.surname}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.headerRight} onPress={() => { onFav(toilet.id) }}>
                                        {user && toilet.isFavedBy.includes(user.id) ?
                                            (<Image style={styles.favButton} source={require('../../../assets/faved.png')} />)
                                            :
                                            (<Image style={styles.favButton} source={require('../../../assets/fav.png')} />)
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    {loading && (<>
                        <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>Submit loading, please don't press anything...</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </>)}
                </>))}

            </View>
        </ScrollView>
    </>)
}

export default Landing