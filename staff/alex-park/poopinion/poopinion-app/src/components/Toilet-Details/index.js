import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import MapView from 'react-native-maps'
import styles from './styles'

function ToiletDetails({ toilet, globalRating, user, onFav, onThumbUp, onThumbDown, onComment, onDelete, onDeleteToilet }) {
    const [comments, setComments] = useState(toilet.comments.slice(0, 5))

    useEffect(() => {
        setComments(toilet.comments.slice(0, 5))
    }, [toilet.comments])

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

                    <View style={styles.scoreContainer}>
                        <Text style={styles.score}>Score:</Text>
                        <View style={styles.allScoreInfo}>
                            <View style={styles.scoreLeft}>
                                <View style={styles.scoreLeftUp}>
                                    <Text style={styles.scoreMean}>{toilet.score ? toilet.score : 0}</Text>
                                </View>
                                <TouchableOpacity style={styles.scoreLeftDown} onPress={() => onComment(toilet.id)}>
                                    <Text style={styles.addRating}>+ Add/
                                    update a rating</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.scoreRight}>
                                <Text>Cleanness: <Text style={styles.smallScore}>{globalRating.cleannessMean}</Text></Text>
                                <Text>Aesthetics: <Text style={styles.smallScore}>{globalRating.looksMean}</Text></Text>
                                <Text>Payment required: {globalRating.paymentMean >= 0.5 ? (<Text style={styles.smallScore}>Yes</Text>) : (<Text style={styles.smallScore}>No</Text>)}</Text>
                                <Text>Multiple toilets: {globalRating.multipleMean >= 0.5 ? (<Text style={styles.smallScore}>Yes</Text>) : (<Text style={styles.smallScore}>No</Text>)}</Text>
                                <Text>Paper provision: {globalRating.paperMean >= 0.5 ? (<Text style={styles.smallScore}>Yes</Text>) : (<Text style={styles.smallScore}>No</Text>)}</Text>
                                <View style={styles.disabledContent}>
                                    <Text>Disabled toilet: </Text>
                                    {toilet.disabledToilet ? (<Image source={require('../../../assets/wheelchair.png')} style={styles.disabledLogo} />)
                                        :
                                        (<Image source={require('../../../assets/wheelchair.png')} style={styles.disabledLogoOpacity} />)}
                                </View>
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
                        <Text style={styles.comments}>Last ratings/comments ({toilet.comments.length}):</Text>
                        {toilet.comments.length ?
                            (comments.map((comment, index) => (<>
                                <View key={index} style={styles.commentContainer}>
                                    <View style={styles.commentTop}>
                                        <View style={styles.commentTopLeft}>
                                            <Text>By: <Text style={styles.commentPublisher}>{comment.publisher.name} {comment.publisher.surname}</Text></Text>
                                            <Text style={styles.commentCreated}>Posted at: {comment.created.toString().slice(0, 10)}</Text>
                                        </View>
                                        <View style={styles.commentTopRight}>
                                            <Text style={styles.commentTopRightText}>Rating: <Text style={{ color: '#df7861' }}>{comment.rating.overallRating}</Text><Text style={{ color: 'brown' }}>/5</Text></Text>

                                        </View>
                                    </View>

                                    <View style={styles.commentItself}>
                                        <Text style={styles.theComment}>"{comment.rating.textArea.length > 0 ? (<Text>{comment.rating.textArea}</Text>) : (<Text>(No text comment added)</Text>)}"</Text>
                                        <View style={styles.thumbs}>
                                            <View style={styles.thumbUpContainer}>
                                                <TouchableOpacity onPress={() => onThumbUp(comment.id.toString())}>
                                                    {user && user.thumbsUp.includes(comment.id.toString()) ? (
                                                        <Image style={styles.thumbUp} source={require('../../../assets/thumb-up.png')} />
                                                    )
                                                        :
                                                        (
                                                            <Image style={styles.thumbUp} source={require('../../../assets/thumb-up-unchecked.png')} />
                                                        )
                                                    }
                                                </TouchableOpacity>

                                                <Text>{comment.thumbsUp.length}</Text>
                                            </View>

                                            <View style={styles.thumbDownContainer}>
                                                <TouchableOpacity onPress={() => onThumbDown(comment.id.toString())}>
                                                    {user && user.thumbsDown.includes(comment.id.toString()) ? (
                                                        <Image style={styles.thumbDown} source={require('../../../assets/thumb-down.png')} />
                                                    )
                                                        :
                                                        (
                                                            <Image style={styles.thumbDown} source={require('../../../assets/thumb-down-unchecked.png')} />
                                                        )
                                                    }
                                                </TouchableOpacity>

                                                <Text>{comment.thumbsDown.length}</Text>
                                            </View>

                                            <TouchableOpacity style={styles.trashContainer} onPress={() => onDelete(toilet.id.toString(), comment.id.toString())}>
                                                {user && comment.publisher._id.toString() === user.id.toString() && <Image style={styles.trash} source={require('../../../assets/delete.png')} />}
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </>)))
                            :
                            (<Text>No comments to display...</Text>)}
                    </View>

                    {user && toilet.publisher.id.toString() === user.id.toString() && (<>
                        <TouchableOpacity onPress={() => onDeleteToilet(toilet.id.toString())} style={styles.deleteContainer}>
                            <Text style={styles.deleteButton}>🗑️ Delete this toilet</Text>
                        </TouchableOpacity>
                    </>)}

                </View>
            </View>
        </ScrollView>
    </>)
}

export default ToiletDetails