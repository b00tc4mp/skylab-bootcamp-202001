import React, { useState } from 'react'
import styles from './styles'
import Post from '../Post'
import { Text, ScrollView, View } from 'react-native'

function Favorites({ user, favToilets, onFav, onDetails }) {
    return (<>
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{user.name} {user.surname}'s Favorite Toilets 🚽</Text>
            </View>

            <View style={styles.favsContainer}>
                {favToilets.length > 0 && favToilets.map(toilet => (<>
                    <Post user={user} onFav={onFav} onDetails={onDetails} toilet={toilet} />
                </>))}

                {!favToilets.length && <Text>No favorite toilets to display...</Text>}
            </View>
        </ScrollView>
    </>)
}

export default Favorites