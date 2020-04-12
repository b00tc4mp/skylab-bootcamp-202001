import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#EDF4F9',
    },
    header: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: '#82A4B3',
        justifyContent: 'space-between',
        padding: 15,

    },
    headerText: {
        paddingTop: 10,
        alignSelf: 'center',
        color: '#EFEBDA',
        fontFamily: 'montserrat-semi',
        fontSize: 18,
        alignSelf: 'flex-end'
    },
    top: {
        paddingTop: 15,

        alignItems: 'center'
    },
    bottom: {
        flex: 0.4,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 40,
        justifyContent: 'space-around'
    },

    text: {
        fontFamily: 'montserrat',
        textAlign: 'center'
    },
    actionButton: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#82A4B3",
        height: 40,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'montserrat-semi',
        letterSpacing: 1,
        color: '#82A4B3'

    },

})

export default styles