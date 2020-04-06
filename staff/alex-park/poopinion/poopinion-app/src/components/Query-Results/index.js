import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import moment from 'moment'

function QueryResults({ query, toilets, user, onFav, onDetails }) {
    const [loading, setLoading] = useState(undefined)

    return (<>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Results for: '{query}'</Text>
                {toilets.length > 0 &&

                    <View style={styles.resultsContainer}>
                        {toilets.map((toilet, index) => (<>
                            <View style={styles.posts} key={index}>
                                <View style={styles.post} key={index}>
                                    {toilet.image ? (<>
                                        <TouchableHighlight activeOpacity={0.5} onPress={() => {
                                            setLoading(toilet.id)
                                            onDetails(toilet.id)
                                        }}>
                                            <Image style={styles.image} source={{ uri: toilet.image }} />
                                        </TouchableHighlight>
                                    </>)
                                        :
                                        (<>
                                            <TouchableHighlight activeOpacity={0.5} onPress={() => onDetails(toilet.id)}>
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
                                {loading === toilet.id && (<>
                                    <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>Submit loading, please don't press anything...</Text>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </>)}
                            </View>
                        </>))}
                    </View>
                }

                {!toilets.length && <Text>Still no toilets to display...</Text>}

            </View>
        </ScrollView>
    </>)
}

export default QueryResults