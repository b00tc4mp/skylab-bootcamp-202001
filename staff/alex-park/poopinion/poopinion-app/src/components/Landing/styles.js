import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 50
    },
    topToilets: {
        flex: 1,
        alignSelf: 'baseline',
        marginLeft: '2.5%'
    },
    topHeader: {
        fontWeight: 'bold',
        width: '95%',
        textAlign: 'center'
    },
    bold: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    place: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    posts: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    post: {
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: '4%',
    },
    image: {
        width: '100%',
        height: 200
    },
    postContent: {
        flex: 1,
        flexDirection: 'row',
    },
    contentLeft: {
        flex: 1,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'column'
    },
    left: {
        fontSize: 18,
    },
    contentRight: {
        flex: 0.25,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    right: {
        fontSize: 30
    },
    mapStyle: {
        width: '95%',
        height: 150,
        marginVertical: 10
    },
    poopRating: {
        flex: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    headerRight: {
        flex: 0.25,

    },
    postedAt: {
        fontStyle: 'italic'
    },
    favButton: {
        resizeMode: 'contain',
        width: '60%',
        height: '60%',
        alignSelf: 'center'
    },
    smallPoop: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start'
    },

})

export default styles