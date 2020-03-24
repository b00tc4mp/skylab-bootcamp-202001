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
    commentsButton: {
        alignSelf: 'flex-end'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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


    votesContainer: {
        margin: 10,
        width: '35%',
        alignSelf: 'flex-end',

    },

    basicInfoContainer: {
        marginLeft: 10,
        width: '50%'
    },

    actionsContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 25,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    approve: {
        padding: 5,
        borderRadius: 5,
        flex: 0.4,
        backgroundColor: 'green'
    },
    actionText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },

    report: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        flex: 0.4
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

    sectionHeader: {
        fontSize: 25,
        fontWeight: 'bold'
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
    commentsLink: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default styles