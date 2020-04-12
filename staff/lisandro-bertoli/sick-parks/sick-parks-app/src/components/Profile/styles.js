import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#EDF4F9',
    },
    header: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: '#82A4B3',
        justifyContent: 'space-between',
        padding: 15,

    },
    modalHeader: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#82A4B3',
        alignItems: 'center',
        paddingHorizontal: 25,
        justifyContent: 'space-between'
    },

    modalButton: {
        color: '#EFEBDA',
        paddingTop: 10
    },

    settingsContainer: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 50
    },
    topSettings: {
        flex: 1
    },

    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        paddingVertical: 15,
        flex: 1,
    },

    label: {
        fontFamily: 'montserrat'

    },

    sectionHeader: {
        fontFamily: 'montserrat-semi',
        alignSelf: 'center'
    },

    textInput: {
        height: '160%',
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        color: '#EFEBDA',
    },

    bottomSettings: {
        justifyContent: 'space-between',
        marginVertical: 50
    },

    headerText: {
        paddingTop: 10,
        alignSelf: 'center',
        color: '#EFEBDA',
        fontFamily: 'montserrat-semi',
        fontSize: 18,
        alignSelf: 'flex-end'
    },
    modalHeaderText: {
        paddingTop: 10,
        alignSelf: 'center',
        color: '#EFEBDA',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'montserrat-semi',
    },
    noImage: {
        width: 100,
        height: 100,
        backgroundColor: '#EFEBDA',
        justifyContent: 'center',
        borderRadius: 10,
    },
    imageContainer: {
        //Todo for when adding images
    },
    topDataContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignContent: 'center',
        alignSelf: 'center'
    },

    logoutImage: {
        height: 22,
        width: 22,
        tintColor: '#EFEBDA'
    },

    dataType: {
        alignSelf: 'center',
        fontFamily: 'montserrat-semi',
        paddingBottom: 30,
    },
    data: {
        alignSelf: 'center',
        fontFamily: 'montserrat'
    },
    topData: {
        //Leave this here for extra styling later
    },
    top: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 15

    },

    userInfo: {
        flex: 0.30,
        justifyContent: 'space-around',
        padding: 15,
        alignSelf: 'flex-start'
    },
    bottom: {
        flex: 0.4,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 40,
        justifyContent: 'space-around'
    },
    actionButton: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#82A4B3",
        height: 40,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    logoutButtonContainer: {
        height: 40,
        width: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'

    },
    logoutButton: {
        color: 'red',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'montserrat-semi',
        letterSpacing: 1,
        color: '#82A4B3'

    },
    input: {
        backgroundColor: '#82A4B3',
        flex: 0.8,
        color: '#EFEBDA',
        borderRadius: 5,
        alignItems: 'center',
        paddingLeft: 5,
        fontFamily: 'montserrat',
    },

    text: {
        fontFamily: 'montserrat',
        textAlign: 'center'
    },
})

export default styles