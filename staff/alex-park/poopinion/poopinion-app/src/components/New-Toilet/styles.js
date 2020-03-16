import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: 30
    },
    mapStyle: {
        width: '100%',
        height: 150,
        marginTop: 10,
        marginBottom: 30
    },
    locationHeader: {
        fontSize: 20
    },
    placeName: {
        fontSize: 20
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    placeInput: {
        fontSize: 20,
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: 'grey',
        borderRadius: 10
    },
    options: {
        fontSize: 20,
        marginVertical: 15
    },
    submitButton: {
        backgroundColor: 'green',
        width: '50%',
        marginHorizontal: '25%',
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        padding: 20,
        borderRadius: 20,
        marginVertical: 25
    },

})

export default styles