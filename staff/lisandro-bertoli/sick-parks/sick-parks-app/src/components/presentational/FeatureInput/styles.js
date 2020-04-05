import { StyleSheet } from 'react-native'

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
        color: '#EFEBDA',
        width: '60%',
        backgroundColor: '#82A4B3',
        borderColor: '#EFEBDA',
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
        fontFamily: 'montserrat-semi',
        paddingBottom: 10,
    },

    textInput: {
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'center',
        padding: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        fontFamily: 'montserrat'
    },
    secondaryButton: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        width: '50%',
        alignSelf: 'center'
    },
    button: {
        color: '#82A4B3',
        fontFamily: 'montserrat-semi'
    }

})

export default styles