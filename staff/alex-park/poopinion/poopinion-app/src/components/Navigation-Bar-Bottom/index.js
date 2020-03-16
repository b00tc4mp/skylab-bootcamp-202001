import React from 'react'
import styles from './styles'
import { View, Text } from 'react-native'

function NavigationBarBottom({goToLanding, goToFavorites, goToProfile, goToNewToilet}) {
    return (<>
        <View style={styles.container}>
            <View style={styles.bottom}>
                <Text style={styles.home} onPress={goToLanding}>💩 Home 💩</Text>
                <Text style={styles.fav} onPress={goToFavorites}>💖🚽💖</Text>
                <Text style={styles.profile} onPress={goToProfile}>👤 Profile 👤</Text>
                <Text style={styles.newPost} onPress={goToNewToilet}>NEW POST</Text>
            </View>
        </View>
    </>)
}

export default NavigationBarBottom