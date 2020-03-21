import React from 'react'
import styles from './styles'
import { Text, ScrollView, TouchableOpacity, View, Image, Alert } from 'react-native'

function Profile({ user, onDetails }) {
    return (<>
        <ScrollView style={styles.container}>
            <View style={styles.nameContainer}>
                <View style={styles.nameHeader}>
                    <View style={styles.picture}>
                        <Text></Text>
                    </View>
                    <View style={styles.nameInfo}>
                        <Text style={[styles.font, styles.bold]}>Name: {user.name} {user.surname}</Text>
                        <Text style={styles.font}>Gender: {user.gender}</Text>
                        <Text style={styles.font}>Age: {user.age}</Text>
                        <Text style={styles.font}>email: {user.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.posts}>
                <Text style={styles.bigText}>{user.publishedToilets.length} Post(s):</Text>
                {user.publishedToilets.length > 0 &&
                    user.publishedToilets.map(toilet => (
                        <TouchableOpacity onPress={() => onDetails(toilet.id.toString())} style={styles.postsContainer}>
                            <View style={styles.innerPost}>
                                <View style={styles.postsLeft}>
                                    <Text style={styles.postTitle}>{toilet.place}</Text>
                                    <Text style={styles.postDate}>Posted at: {toilet.created.toString().slice(0, 10)}</Text>
                                </View>
                                <View style={styles.postsRight}>
                                    {toilet.image ? (<Image style={styles.image} source={{ uri: toilet.image }} />)
                                        :
                                        (<Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={styles.comments}>
                <Text style={styles.bigText}>{user.comments.length} Comment(s):</Text>
                {user.comments.length > 0 &&
                    user.comments.map(comment => (
                        <TouchableOpacity onPress={() => onDetails(comment.commentedAt.toString())} style={styles.postsContainer}>
                            <View style={styles.innerPost}>
                                <View style={styles.postsLeftComment}>
                                    <Text>"{comment.rating.textArea.length > 0 ? (<Text style={styles.commentText}>{comment.rating.textArea}</Text>) : (<Text>(No text comment added)</Text>)}"</Text>
                                    <Text style={styles.postDate}>Posted at: {comment.created.toString().slice(0, 10)}</Text>
                                    <View style={styles.innerPost}>
                                        <View style={styles.innerPost}>
                                            <Image source={require('../../../assets/thumb-up.png')} style={styles.thumb} /><Text></Text>
                                            <Text style={styles.thumbCount}>: {comment.thumbsUp.length}</Text>
                                        </View>

                                        <View style={styles.innerPost}>
                                            <Image source={require('../../../assets/thumb-down.png')} style={styles.thumb} /><Text></Text>
                                            <Text style={styles.thumbCount}>: {comment.thumbsDown.length}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.postsRight}>
                                    <Text style={styles.postTitle}>Toilet's score: {comment.rating.overallRating}</Text>
                                    <Text>Cleanness: {comment.rating.cleanness}</Text>
                                    <Text>Aesthetics: {comment.rating.looks}</Text>
                                    <Text>Payment required: {comment.rating.paymentRequired > 0 ? (<Text>Yes</Text>) : (<Text>No</Text>)}</Text>
                                    <Text>Multiple toilets: {comment.rating.multipleToilets > 0 ? (<Text>Yes</Text>) : (<Text>No</Text>)}</Text>
                                    <Text>Paper provision: {comment.rating.paperDeployment > 0 ? (<Text>Yes</Text>) : (<Text>No</Text>)}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                    ))
                }
            </View>
        </ScrollView>
    </>)
}

export default Profile