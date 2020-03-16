import React from 'react'
import styles from './styles'
import { Text, ScrollView, View, TouchableOpacity } from 'react-native'

function Favorites({ user }) {
    return (<>
        <ScrollView style={styles.container}>
            <TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>{user.name} {user.surname}'s Favorite Toilets 🚽</Text>
                </View>

                <View style={styles.favsContainer}>
                    <Text>No toilets favorited yet...</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </>)
}

export default Favorites