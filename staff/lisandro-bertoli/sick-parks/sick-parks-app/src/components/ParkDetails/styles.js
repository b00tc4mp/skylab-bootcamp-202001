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

    pickerContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center'
    },
    picker: {
        height: 35,
        color: '#EFEBDA',
        width: '60%',
        backgroundColor: '#82A4B3',
        borderColor: '#EFEBDA',
        borderWidth: 2
    },

    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        flex: 1,
    },

    textInput: {
        height: '100%',
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        fontFamily: 'montserrat'
    },
    image: {
        width: '100%',
        height: 200
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
        fontSize: 16,
        color: '#EFEBDA',
        marginTop: 10,
        fontFamily: 'montserrat'
    },
    headerTextBold: {
        fontSize: 18,
        color: '#EFEBDA',
        marginTop: 10,
        paddingRight: 10,
        fontFamily: 'montserrat-semi'
    },
    modalHeader: {
        flex: 0.1,
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#82A4B3',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    isVerified: {
        alignSelf: 'center',
        backgroundColor: 'lightgreen',
        padding: 5,
        fontFamily: 'montserrat'
    },

    isNotVerified: {
        alignSelf: 'center',
        backgroundColor: '#ff726f',
        padding: 5,
    },

    delete: {
        marginVertical: 10,
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
        backgroundColor: '#18BC0F'
    },
    actionText: {
        fontFamily: 'montserrat-semi',
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
        fontSize: 20,
        fontFamily: 'montserrat-semi'
    },

    votes: {
        fontSize: 35,
        fontFamily: 'montserrat-semi',
        color: '#82A4B3',
        textAlign: 'center',
    },


    basicInfo: {
        backgroundColor: '#82A4B3',
        padding: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        fontFamily: 'montserrat-bold',
        textAlign: 'center',
        color: '#EFEBDA',
    },
    upVote: {
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#82A4B3',
        borderWidth: 2,
        fontFamily: 'montserrat-semi',
        textAlign: 'center',
        color: '#18BC0F',
    },
    downVote: {
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#82A4B3',
        borderWidth: 2,
        fontFamily: 'montserrat-semi',
        textAlign: 'center',
        color: 'red',
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
        fontFamily: 'montserrat-semi',
        paddingBottom: 10,
    },

    featureData: {
        fontFamily: 'montserrat',
    },
    propContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    commentsLink: {
        textAlign: 'center',
        fontFamily: 'montserrat-semi',
    }
})

export default styles