import { StyleSheet } from 'react-native'
import { colors, fonts } from '../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop: 15
    },
    pickerContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },
    picker: {
        height: 40,
        color: colors.SECONDARY,
        width: '60%',
        backgroundColor: colors.MAIN,
        borderColor: colors.SECONDARY,
        borderWidth: 2
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        alignItems: 'center',
        flex: 1,
    },

    featureProp: {
        fontFamily: fonts.SEMI,
        paddingBottom: 10,
    },

    textInput: {
        backgroundColor: colors.MAIN,
        width: '60%',
        alignSelf: 'center',
        padding: 10,
        borderColor: colors.SECONDARY,
        borderWidth: 2,
        fontFamily: fonts.REGULAR
    },
    secondaryButton: {
        alignItems: 'center',
        borderColor: colors.MAIN,
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        width: '50%',
        alignSelf: 'center'
    },
    button: {
        color: colors.MAIN,
        fontFamily: fonts.SEMI
    }

})

export default styles