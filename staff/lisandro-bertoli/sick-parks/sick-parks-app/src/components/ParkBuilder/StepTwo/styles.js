import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-around',

        paddingHorizontal: 10,
        paddingBottom: 10
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
    modalHeader: {
        flex: 0.1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#EDF4F9',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    mapStyle: {

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.855,
    },

    modalText: {
        color: '#82A4B3',
        fontSize: 16,
        fontFamily: 'montserrat-semi',
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        flex: 1,
    },

    itemContainer: {
        flex: 1,
        marginVertical: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#EFEBDA',
    },
    itemLabel: {
        alignSelf: 'center',
        fontFamily: 'montserrat-semi',
        fontSize: 16,
        marginBottom: 5
    },
    textInput: {
        height: '170%',
        backgroundColor: '#82A4B3',
        width: '60%',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: '#EFEBDA',
        borderWidth: 2,
        color: '#EFEBDA',
        fontFamily: 'montserrat',

    },
    nextButton: {
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
    label: {
        fontFamily: 'montserrat-semi'

    }

})

export default styles