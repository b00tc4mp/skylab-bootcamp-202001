import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Alert, Picker } from 'react-native'
import MyButton from '../Button'
import MapView from 'react-native-maps'
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'

function ParkDetails({ user, park, onVote, onCommentSubmit, onContribution, onUpdate }) {
    const [comments, setComments] = useState(park.comments)
    const [votes, setVotes] = useState(park.rating)
    const [showComments, setShowComments] = useState(false)
    const [createComment, setCreateComment] = useState(false)
    const [value, onChangeText] = useState('')
    const [feature, setFeature] = useState({ name: 'rail', size: 's', description: '' })
    const [updateSection, setUpdateSection] = useState(false)

    useEffect(() => {
        setComments(park.comments)
        setVotes(park.rating)
    }, [park.rating, park.features])

    const handleHideModal = () => setShowComments(false)
    const handleNewFeature = () => {
        !updateSection && setUpdateSection(true)
        updateSection && onUpdate({ features: [...park.features, feature] })
    }
    const handleDeleteFeature = (id) => {

        const updated = park.features.filter(feature => feature.id !== id)

        onUpdate({ features: [...updated] })
    }
    const handleUpVote = () => onVote(true)
    const handleDownVote = () => onVote(false)
    const handleNewComment = () => onCommentSubmit(value)
    const handleReport = () => {
        Alert.alert(
            "Report a problem",
            'Please let us know what went wrong',
            [
                { text: 'Fake', onPress: () => onContribution('unreal') },
                { text: 'Duplicate', onPress: () => onContribution('duplicate') },
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
            ],
        )

    }

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
                        <View style={{ backgroundColor: '#EDF4F9', flex: 1 }}>


                            <ScrollView contentContainerStyle={{ backgroundColor: '#EDF4F9' }}>

                                <View style={styles.modalHeader}>
                                    <MyButton onPress={handleHideModal} text='Cancel' textStyle={styles.headerText} />
                                    <Text style={styles.headerText}>Comments</Text>
                                    <TouchableOpacity onPress={() => setCreateComment(true)}>
                                        <Text style={styles.headerText}>Add</Text>
                                    </TouchableOpacity>
                                </View>

                                {createComment && (
                                    <View style={styles.newCommentContainer}>
                                        <TextInput
                                            style={styles.newComment}
                                            multiline={true}
                                            numberOfLines={4}
                                            onChangeText={(text) => onChangeText(text)}
                                            value={value}
                                        />
                                        <View style={styles.buttonsContainer}>
                                            <TouchableOpacity style={styles.buttonContainer} onPress={() => setCreateComment(false)}>
                                                <Text style={styles.commentButton}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonContainer} onPress={handleNewComment}>
                                                <Text style={styles.commentButton}>Publish</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>)}
                                <View style={styles.commentsContainer}>

                                    {comments.length > 0 ? (comments.map((comment, index) => (<>
                                        <View key={index} style={styles.commentContainer}>
                                            <View style={styles.commentHeader}>
                                                <Text style={styles.commentPublisher}>{comment.postedBy.name}</Text>
                                            </View>
                                            <View style={styles.commentBody}>
                                                <Text style={styles.commentBodyText}>{comment.body}</Text>
                                            </View>
                                            <View style={styles.commentFooter}>
                                                <Text style={styles.commentDate}>{comment.date.toString().slice(0, 10)}</Text>
                                            </View>
                                        </View>
                                    </>))) :
                                        (<View style={styles.noComments}>
                                            <Text>No comments yet...</Text>

                                            <Text>Be the firs one!</Text>

                                        </View>
                                        )
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                    <View style={styles.mapContainer}>

                        <MapView style={styles.mapStyle}
                            region={{
                                latitude: park.location.coordinates[1],
                                longitude: park.location.coordinates[0],
                                latitudeDelta: 0.1422,
                                longitudeDelta: 0.121,
                            }}>
                            <MapView.Marker coordinate={{
                                latitude: park.location.coordinates[1],
                                longitude: park.location.coordinates[0],
                                latitudeDelta: 0.1422,
                                longitudeDelta: 0.121,
                            }} />
                        </MapView>
                    </View>
                    {park.verified && (<View style={styles.approve}>
                        <Text style={styles.actionText}>Verified Park</Text>
                    </View>
                    )}
                    {!park.verified && (

                        <View style={styles.actionsContainer}>

                            <TouchableOpacity style={styles.approve} onPress={() => onContribution('approve')}>
                                <Text style={styles.actionText}>✅ Approve </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.report} onPress={handleReport}>
                                <Text style={styles.actionText}>❕Report </Text>
                            </TouchableOpacity>


                        </View>

                    )}
                    <View style={styles.featuresContainer}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Text style={styles.sectionHeader}>Park features ({park.features.length})</Text>
                            {user.id === park.creator.id ? (
                                <MyButton text='+Add feature' style={styles.buttonContainer} textStyle={styles.commentButton} onPress={handleNewFeature} />) : null}
                            {updateSection && (<View style={{ justifyContent: "space-around" }}>
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.featureProp} >Type: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => setFeature({ ...feature, name: value })}
                                    >
                                        <Picker.Item label="Rail" value="rail" />
                                        <Picker.Item label="Kicker" value="kicker" />
                                        <Picker.Item label="Box" value="box" />
                                        <Picker.Item label="Pipe" value="pipe" />
                                        <Picker.Item label="Other" value="other" />

                                    </Picker>
                                </View>
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.featureProp} >Size: </Text>
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{ height: 40 }}
                                        onValueChange={(value) => setFeature({ ...feature, size: value })}
                                    >
                                        <Picker.Item label="Small" value="s" />
                                        <Picker.Item label="Medium" value="m" />
                                        <Picker.Item label="Large" value="l" />
                                        <Picker.Item label="XL" value="xl" />
                                    </Picker>
                                </View>

                                <View style={styles.inputsContainer}>
                                    <Text style={styles.featureProp}>Description:</Text>
                                    <TextInput
                                        selectionColor='#EDF4F9'
                                        placeholder='Eg: Gnarly kinked rail'
                                        style={styles.textInput}
                                        onChangeText={(text) => setFeature({ ...feature, description: text })}
                                    />
                                </View>
                            </View>)}
                        </View>
                        {park.features.length ?
                            (park.features.map((feature, index) => (<>
                                {user.id === park.creator.id ? (<View style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 15 }}>
                                    <MyButton text='✖' onPress={() => handleDeleteFeature(feature.id)} />
                                </View>) : null}
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