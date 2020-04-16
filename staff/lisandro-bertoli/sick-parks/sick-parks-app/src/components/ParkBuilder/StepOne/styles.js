import { StyleSheet, Dimensions } from 'react-native'
import { colors, fonts } from '../../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: 10,
        marginTop: 10,
        paddingBottom: '5%'
    },
    topContainer: {
        flex: 1
    },
    bottomContainer: {
        justifyContent: 'space-between',
        marginVertical: 25
    },

    sectionHeader: {
        alignSelf: 'center',
        fontFamily: fonts.SEMI,
        fontSize: 16
    },

    modalText: {
        color: colors.MAIN,
        fontSize: 16,
        fontFamily: fonts.SEMI
    },
    modalHeader: {
        flex: 0.1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: colors.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        flex: 1,
    },

    textInput: {
        height: '160%',
        backgroundColor: colors.MAIN,
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
        fontFamily: fonts.REGULAR,
        color: colors.SECONDARY

    },
    pickerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    picker: {
        height: 40,
        color: colors.SECONDARY,
        width: '60%',
        backgroundColor: colors.MAIN,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.855,
    },

    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        flex: 1
    },

    numberInput: {
        height: '150%',
        backgroundColor: colors.MAIN,
        width: '20%',
        alignSelf: 'flex-end',
        borderColor: colors.SECONDARY,
        color: colors.SECONDARY,
        borderWidth: 2,
        paddingHorizontal: 10,
        fontFamily: fonts.REGULAR
    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: colors.MAIN,
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center'

    },
    nextButton: {
        alignItems: 'center',
        borderColor: colors.MAIN,
        borderWidth: 2,
        backgroundColor: colors.SECONDARY,
        padding: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10,

    },
    button: {
        color: colors.MAIN,
        fontFamily: fonts.SEMI
    },

    label: {
        fontFamily: fonts.SEMI

    }

})

export default styles