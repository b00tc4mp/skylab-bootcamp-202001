import { StyleSheet } from 'react-native'
import { colors, fonts } from '../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND,
    },
    header: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: colors.MAIN,
        justifyContent: 'space-between',
        padding: 15,

    },
    modalHeader: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: colors.MAIN,
        alignItems: 'center',
        paddingHorizontal: 25,
        justifyContent: 'space-between'
    },

    modalButton: {
        color: colors.SECONDARY,
        paddingTop: 10
    },

    settingsContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
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
        fontFamily: fonts.REGULAR

    },

    sectionHeader: {
        fontFamily: fonts.SEMI,
        alignSelf: 'center'
    },

    textInput: {
        height: '160%',
        backgroundColor: colors.MAIN,
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
        color: colors.SECONDARY,
    },

    bottomSettings: {
        justifyContent: 'space-between',
        marginVertical: 50
    },

    headerText: {
        paddingTop: 10,
        alignSelf: 'center',
        color: colors.SECONDARY,
        fontFamily: fonts.SEMI,
        fontSize: 18,
        alignSelf: 'flex-end'
    },
    modalHeaderText: {
        paddingTop: 10,
        alignSelf: 'center',
        color: colors.SECONDARY,
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: fonts.SEMI,
    },
    noImage: {
        width: 100,
        height: 100,
        backgroundColor: colors.SECONDARY,
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
        tintColor: colors.SECONDARY
    },

    dataType: {
        alignSelf: 'center',
        fontFamily: fonts.SEMI,
        paddingBottom: 30,
    },
    data: {
        alignSelf: 'center',
        fontFamily: fonts.REGULAR
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
        alignSelf: 'flex-start',
        textAlign: 'left'
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
        borderColor: colors.MAIN,
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
        fontFamily: fonts.SEMI,
        letterSpacing: 1,
        color: colors.MAIN

    },
    input: {
        backgroundColor: colors.MAIN,
        flex: 0.8,
        color: colors.SECONDARY,
        borderRadius: 5,
        alignItems: 'center',
        paddingLeft: 5,
        fontFamily: fonts.REGULAR,
    },

    text: {
        fontFamily: fonts.REGULAR,
        // textAlign: 'center'
    },
})

export default styles