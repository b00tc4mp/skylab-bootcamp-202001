import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    infoContainer: {
        width: '95%',
        marginHorizontal: '2.5%'
    },
    scoreContainer: {
        width: '100%',
        marginVertical: 15
    },
    mapContainer: {
        width: '100%',
        marginVertical: 15
    },
    image: {
        width: '100%',
        height: 200
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'column'
    },
    headerRight: {
        flex: 0.25
    },
    favButton: {
        resizeMode: 'contain',
        width: '60%',
        height: '60%',
        alignSelf: 'center'
    },
    place: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    rating: {
        fontSize: 20
    },
    postedAt: {
        fontStyle: 'italic'
    },
    mapStyle: {
        width: '100%',
        height: 150,
        marginVertical: 10
    },
    location: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    score: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    comments: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    allScoreInfo: {
        flexDirection: 'row'
    },
    scoreLeft: {
        margin: 15
    },
    scoreLeftUp: {
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#df7861',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 50
    },
    scoreMean: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#df7861',
        textAlign: 'center'
    },
    addRating: {
        backgroundColor: '#df7861',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    scoreRight: {
        margin: 15,
        justifyContent: 'space-around'
    },
    poopRating: {
        flex: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    smallPoop: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start'
    },
    commentContainer: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 15,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },
    commentPublisher: {
        fontWeight: 'bold'
    },
    commentCreated: {
        fontStyle: 'italic'
    },
    commentTop: {
        flexDirection: 'row'
    },
    commentTopLeft: {
        flex: 1
    },
    commentTopRight: {
        flex: 1,
        alignSelf: 'center',
    },

    commentTopRightText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10
    },
    commentItself: {
        marginTop: 25
    },
    theComment: {
        fontStyle: 'italic'
    }
})

export default styles