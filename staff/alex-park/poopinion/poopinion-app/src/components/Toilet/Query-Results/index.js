import React from 'react'
import styles from './styles'
import { View, ScrollView, Text } from 'react-native'
import { Post } from '../'

function QueryResults({ query, toilets, user, onFav, onDetails }) {
    return (<>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Results for: '{query}'</Text>
                {toilets.length > 0 &&

                    <View style={styles.resultsContainer}>
                        {toilets.map(toilet => (<>
                            <Post toilet={toilet} user={user} onFav={onFav} onDetails={onDetails} />
                        </>))}
                    </View>
                }

                {!toilets.length && <Text style={styles.noToilets}>No toilets to display...</Text>}
            </View>
        </ScrollView>
    </>)
}

export default QueryResults