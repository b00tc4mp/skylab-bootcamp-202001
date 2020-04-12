import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    input: {
        backgroundColor: COLORS.main,
        flex: 0.20,
        width: '75%',
        color: COLORS.secondary,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: COLORS.secondary,
        borderWidth: 2,
        fontFamily: FONTS.regular
    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: COLORS.main,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        padding: 15,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        color: COLORS.main,
        fontFamily: FONTS.semiBold
    },

    anchor: {
        color: COLORS.main,
        fontFamily: FONTS.regular
    },

    danger: {
        color: 'red'
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 5
    }
})

export default styles