import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#EDF4F9',
        width: '100%',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 10
    },
    skipButton: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        width: '50%',
        alignSelf: 'center'

    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: '#EFEBDA',
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        color: '#82A4B3',
        fontFamily: 'montserrat-semi',
    },


})

export default styles