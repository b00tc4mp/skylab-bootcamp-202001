import { StyleSheet, Dimensions } from 'react-native'

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
    newPost: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    profile: {
        flex: 1,
        textAlign: 'center'
    }
})

export default styles