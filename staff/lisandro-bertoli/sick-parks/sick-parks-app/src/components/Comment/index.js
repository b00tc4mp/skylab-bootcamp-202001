import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const Comment = ({ data }) => (
    <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
            <Text style={styles.commentPublisher}>{data.postedBy.name}</Text>
        </View>
        <View style={styles.commentBody}>
            <Text style={styles.commentBodyText}>{data.body}</Text>
        </View>
        <View style={styles.commentFooter}>
            <Text style={styles.commentDate}>{data.date.toString().slice(0, 10)}</Text>
        </View>
    </View>
)

export default Comment
