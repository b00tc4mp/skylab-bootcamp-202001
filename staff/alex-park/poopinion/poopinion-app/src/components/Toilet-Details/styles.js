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
    commentsContainer: {
        marginTop: 15,
        marginBottom: 40
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
        margin: 15,
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 0.8
    },
    scoreLeftUp: {
        flex: 2,
        borderWidth: 5,
        borderColor: '#df7861',
        width: '100%',
        marginBottom: 10,
        borderRadius: 50,
        alignContent: 'center',
        justifyContent: 'center'
    },
    scoreLeftDown: {
        flex: 1
    },
    scoreMean: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#df7861',
        textAlign: 'center',
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
    smallScore: {
        fontWeight: 'bold',
        fontSize: 18
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
    },
    thumbs: {
        flexDirection: 'row',
        margin: 10
    },
    thumbUp: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 10
    },
    thumbDown: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginHorizontal: 10
    },
    thumbUpContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    thumbDownContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    trashContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
    },
    trash: {
        width: 40,
        height: 40,
        resizeMode: 'contain',

    },
    disabledContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    disabledLogo: { 
        width: 30, 
        height: 30, 
        resizeMode: 'contain' 
    },
    disabledLogoOpacity: { 
        width: 30, 
        height: 30, 
        resizeMode: 'contain',
        opacity: 0.2
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginBottom: 15,
        textAlign: 'center'
    },
    profilePic: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        paddingHorizontal: 15,
    }
})

export default styles