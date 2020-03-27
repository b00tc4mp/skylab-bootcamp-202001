import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#EDF4F9',
    },
    input: {
        backgroundColor: '#82A4B3',
        flex: 0.20,
        width: '75%',
        color: '#EFEBDA',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        // borderRadius: 10
    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: '#EFEBDA',
        padding: 15,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        color: '#82A4B3',
        fontWeight: 'bold',
    },

    anchor: {
        color: '#82A4B3'
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