import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
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
        fontFamily: 'montserrat-semi',
        fontSize: 16
    },

    modalText: {
        color: '#82A4B3',
        fontSize: 16,
        fontFamily: 'montserrat-semi'
    },
    modalHeader: {
        flex: 0.1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#EDF4F9',
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
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        fontFamily: 'montserrat',
        color: '#EFEBDA'

    },
    pickerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    picker: {
        height: 40,
        color: '#EFEBDA',
        width: '60%',
        backgroundColor: '#82A4B3',
        borderColor: '#EFEBDA',
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
        backgroundColor: '#82A4B3',
        width: '20%',
        alignSelf: 'flex-end',
        borderColor: '#EFEBDA',
        color: '#EFEBDA',
        borderWidth: 2,
        paddingHorizontal: 10,
        fontFamily: 'montserrat'
    },
    buttonContainer: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center'

    },
    nextButton: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: '#EFEBDA',
        padding: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10,

    },
    button: {
        color: '#82A4B3',
        fontFamily: 'montserrat-semi'
    },

    label: {
        fontFamily: 'montserrat-semi'

    }

})

export default styles