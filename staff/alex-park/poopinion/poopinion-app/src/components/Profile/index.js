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
                            <View  style={styles.innerPost}>
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
                <Text style={styles.bigText}>0 Comments:</Text>
            </View>
        </ScrollView>
    </>)
}

export default Profile