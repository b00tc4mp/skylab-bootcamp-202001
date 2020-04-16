import { StyleSheet, Dimensions } from 'react-native'
import { colors, fonts } from '../../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingBottom: 10
    },

    modalHeader: {
        flex: 0.1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: colors.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.855,
    },

    modalText: {
        color: colors.MAIN,
        fontSize: 16,
        fontFamily: fonts.SEMI,
    },

    itemContainer: {
        flex: 1,
        marginVertical: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.SECONDARY,
    },
    itemLabel: {
        alignSelf: 'center',
        fontFamily: fonts.SEMI,
        fontSize: 16,
        marginBottom: 5
    },
    textInput: {
        height: '170%',
        backgroundColor: colors.MAIN,
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
        color: colors.SECONDARY,
        fontFamily: fonts.REGULAR,

    },
    nextButton: {
        alignItems: 'center',
        borderColor: colors.MAIN,
        borderWidth: 2,
        backgroundColor: colors.SECONDARY,
        padding: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10
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