import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
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
    featuresContainer: {
        marginTop: 15,
        marginBottom: 40

    },

    commentsContainer: {
        marginTop: 15,
        marginBottom: 40
    },
    commentsHeader: {

    },
    commentsBody: {

    },
    commentsFooter: {

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
        flex: 0.7,
        paddingTop: 3,
        flexDirection: 'column'
    },
    headerRight: {
        flex: 0.5,
        alignSelf: 'center',
    },

    top: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between'
    },

    headerText: {
        fontSize: 20,
        color: '#EFEBDA',
        marginTop: 10
    },

    modalHeader: {
        flex: 0.1,
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: '#82A4B3',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    isVerified: {
        alignSelf: 'center',
        backgroundColor: 'lightgreen',
        padding: 5,
    },

    isNotVerified: {
        alignSelf: 'center',
        backgroundColor: '#ff726f',
        padding: 5,
    },

    favButton: {
        resizeMode: 'contain',
        width: '60%',
        height: '60%',
        alignSelf: 'center'
    },
    votesContainer: {
        margin: 10,
        width: '35%',
        alignSelf: 'flex-end',

    },
    basicInfoContainer: {
        marginLeft: 10,
        width: '50%'
    },
    place: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    rating: {
        fontSize: 20
    },
    postedAt: {
        fontStyle: 'italic',
        paddingBottom: 3,
    },
    mapStyle: {
        width: '98%',
        height: 150,
        marginVertical: 10
    },
    location: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    sectionHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    scoreLeft: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 0.8
    },
    votes: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#82A4B3',
        textAlign: 'center',
    },

    basicInfo: {
        backgroundColor: '#82A4B3',
        padding: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#EFEBDA',
    },
    upVote: {
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#82A4B3',
        borderWidth: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'green',
    },
    downVote: {
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#82A4B3',
        borderWidth: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
    scoreRight: {
        margin: 15,
        flex: 1,
        width: '50%',
        flexDirection: 'row',
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
    commentsContainer: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#82A4B3',
        borderRadius: 5,
        padding: 15,
        backgroundColor: 'white'
    },

    featureContainer: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#82A4B3',
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    featureProp: {
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    propContainer: {
        flex: 1,
        justifyContent: 'space-around'
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

    }
})

export default styles