import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#EDF4F9',
    },
    header: {
        flex: 0.1,
        backgroundColor: '#82A4B3',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    modalHeader: {
        flex: 0.1,
        backgroundColor: '#82A4B3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        paddingTop: 10,
        alignSelf: 'center'
    },
    noImage: {
        width: 100,
        height: 100,
        backgroundColor: '#EFEBDA',

        justifyContent: 'center',
        borderRadius: 10,
    },
    imageContainer: {

    },
    topDataContainer: {
        flex: 1,
        height: '40%',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignContent: 'center'
    },
    topData: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-evenly'
    },
    top: {
        height: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15

    },
    bottom: {
        flex: 0.4,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 40,
        justifyContent: 'space-around'
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

    logoutButton: {
        height: 40,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: '#82A4B3'

    },
})

export default styles