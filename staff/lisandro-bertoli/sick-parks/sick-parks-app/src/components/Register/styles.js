import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 350,
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

    },
    input: {
        backgroundColor: '#82A4B3',
        flex: 0.15,
        width: '75%',
        color: '#EFEBDA',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        fontFamily: 'montserrat'
    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: '#EFEBDA',
        padding: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        color: '#82A4B3',
        fontFamily: 'montserrat-semi'
    },

    anchor: {
        color: '#82A4B3',
        fontFamily: 'montserrat'
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