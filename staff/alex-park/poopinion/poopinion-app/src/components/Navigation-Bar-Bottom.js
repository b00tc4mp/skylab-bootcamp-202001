import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

function NavigationBarBottom({goToLanding, goToFavorites, goToProfile}) {
    return (<>
        <View style={styles.container}>
            <View style={styles.bottom}>
                <Text style={styles.home} onPress={goToLanding}>💩 Home 💩</Text>
                <Text style={styles.fav} onPress={goToFavorites}>💖🚽💖</Text>
                <Text style={styles.profile} onPress={goToProfile}>👤 Profile 👤</Text>
            </View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-end'
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    home: {
        flex: 1,
        textAlign: 'center'
    },
    fav: {
        flex: 1,
        textAlign: 'center'
    },
    profile: {
        flex: 1,
        textAlign: 'center'
    }
})

export default NavigationBarBottom