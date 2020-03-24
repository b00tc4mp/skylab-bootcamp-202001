import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, ScrollView, TouchableOpacity, Text, Image, Alert } from 'react-native'
//user && user.favToilets.find(favToilet => favToilet.id === toilet.id) === toilet.id ?
function QueryResults({ query, toilets, user, onFav, onDetails }) {
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
                                <TouchableOpacity onPress={() => onDetails(toilet.id)}>
                                    <Image style={styles.image} source={{ uri: toilet.image }} />
                                </TouchableOpacity>
                            </>)
                                :
                                (<>
                                    <TouchableOpacity onPress={() => onDetails(toilet.id)}>
                                        <Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />
                                    </TouchableOpacity>
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
                            </View>
                        </View>
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