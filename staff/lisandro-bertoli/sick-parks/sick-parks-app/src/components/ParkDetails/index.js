import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import MyButton from '../Button'
import MapView from 'react-native-maps'
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'

function ParkDetails({ park, error, onVote, onCommentSubmit }) {
    const [comments, setComments] = useState(park.comments)
    const [votes, setVotes] = useState(park.rating)
    const [showComments, setShowComments] = useState(false)
    const [createComment, setCreateComment] = useState(false)
    const [value, onChangeText] = useState('')

    useEffect(() => {
        setVotes(park.rating)
        setComments(park.comments)
        setVotes(park.rating)
    }, [park.rating, park.comments, park.rating])

    const handleHideModal = () => setShowComments(false)
    const handleUpVote = () => onVote(true)
    const handleDownVote = () => onVote(false)
    const handleNewComment = () => {
        onCommentSubmit(value)
    }

    console.log(comments)
    return (<>
        <ScrollView >
            <View style={styles.container}>
                {park.image ? (<Image style={styles.image} source={{ uri: toilet.image }} />)
                    :
                    (<Image style={styles.image} source={require('../../../assets/default-details.jpg')} />)}
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.postedAt}>Creation date: {park.created.toString().slice(0, 10)}.</Text>
                            <Text>Created by: {park.creator.name}</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.commentsButton} onPress={() => setShowComments(true)}>
                                <Text style={styles.commentsLink}>See what people are saying</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.top}>
                        <View style={styles.basicInfoContainer}>
                            <View>
                                <Text style={styles.basicInfo}>{park.resort.toUpperCase()}</Text>
                            </View>
                            <View>
                                <Text style={styles.votes}>{park.size.toUpperCase()}</Text>
                            </View>
                            <View >
                                <Text style={styles.basicInfo}>{park.level}</Text>
                            </View>
                        </View>
                        <View style={styles.votesContainer}>
                            <TouchableOpacity onPress={handleUpVote}>
                                <Text style={styles.upVote}>+ Vote</Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.votes}>{votes ? votes : 0}</Text>
                            </View>
                            <TouchableOpacity onPress={handleDownVote}>
                                <Text style={styles.downVote}>- Vote</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={showComments}>
                        <View style={styles.modalHeader}>
                            <MyButton onPress={handleHideModal} text='Cancel' textStyle={styles.headerText} />
                            <Text style={styles.headerText}>Comments</Text>
                            <TouchableOpacity onPress={() => setCreateComment(true)}>
                                <Text style={styles.headerText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.commentsContainer}>
                            {createComment && (<>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(text) => onChangeText(text)}
                                    value={value}
                                />
                                <TouchableOpacity onPress={handleNewComment}>
                                    <Text style={styles.headerText}>Publish</Text>
                                </TouchableOpacity>
                            </>)}
                            {comments.length && (comments.map((comment, index) => (<>
                                <View key={index} style={styles.commentContainer}>
                                    <View style={styles.comentHeader}>
                                        <Text style={styles.commentPublisher}>{comment.postedBy.name}</Text>
                                    </View>
                                    <View style={styles.commentBody}>
                                        <Text style={styles.commentBodyText}>{comment.body}</Text>
                                    </View>
                                    <View style={styles.commentFooter}>
                                        <Text style={styles.commentDate}>{comment.date.toString().slice(0, 10)}</Text>
                                    </View>
                                </View>
                            </>)))}
                            {!comments.length && (<View>
                                <Text>No comments yet...</Text>
                                <TouchableOpacity>
                                    <Text>Post the first comment!</Text>
                                </TouchableOpacity>
                            </View>
                            )}
                        </View>

                    </Modal>
                    <View style={styles.mapContainer}>

                        <MapView style={styles.mapStyle}
                            region={{
                                latitude: park.location.coordinates[1],
                                longitude: park.location.coordinates[0],
                            }}>
                            <MapView.Marker coordinate={{
                                latitude: park.location.coordinates[1],
                                longitude: park.location.coordinates[0]
                            }} />
                        </MapView>
                    </View>
                    {park.verified && (<View>
                        <Text style={styles.approve}>Verified Park</Text>
                    </View>
                    )}
                    {!park.verified && (

                        <View style={styles.actionsContainer}>

                            <TouchableOpacity style={styles.approve}>
                                <Text style={styles.actionText}>Approve</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.report}>
                                <Text style={styles.actionText}>Report</Text>
                            </TouchableOpacity>


                        </View>

                    )}
                    <View style={styles.featuresContainer}>
                        <Text style={styles.sectionHeader}>Park features ({park.features.length}):</Text>
                        {park.features.length ?
                            (park.features.map((feature, index) => (<>
                                <View key={index} style={styles.featureContainer}>
                                    <View style={styles.propContainer}>
                                        <Text style={styles.featureProp}>Type</Text>
                                        <Text >{feature.name}</Text>
                                    </View>
                                    <View style={styles.propContainer}>
                                        <Text style={styles.featureProp}>Size</Text>
                                        <Text>{feature.size.toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.propContainer}>
                                        <Text style={styles.featureProp}>Description</Text>
                                        <Text>{feature.description}</Text>
                                    </View>
                                </View>
                            </>)))
                            :
                            (<Text>No features were added to this</Text>)}
                    </View>

                </View>
            </View>
        </ScrollView>
    </>)
}

export default ParkDetails