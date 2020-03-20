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
                        {toilets.map(toilet => (<>
                            <View style={styles.toiletContainer}>
                                <TouchableOpacity onPress={() => onDetails(toilet.id.toString())}>
                                    {toilet.image ? (<Image style={styles.image} source={{uri: toilet.image}} />)
                                    :
                                    (<Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />)}
                                </TouchableOpacity>
                                <View style={styles.infoContainer}>
                                    <TouchableOpacity style={styles.result}>
                                        <Text style={styles.postHeader}>{toilet.place}</Text>
                                        <Text style={styles.rating}>💩💩💩💩💩</Text>
                                        <Text style={styles.postedAt}>Posted at: {toilet.created.toString().slice(0, 10)}, by {toilet.publisher.name} {toilet.publisher.surname}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.favContainer} onPress={() => { onFav(toilet.id) }}>
                                        {user && toilet.isFavedBy.includes(user.id) ?
                                            (<Image style={styles.favButton} source={require('../../../assets/faved.png')} />)
                                            :
                                            (<Image style={styles.favButton} source={require('../../../assets/fav.png')} />)
                                        }


                                    </TouchableOpacity>
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