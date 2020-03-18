import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({

    top: {
        flex: 0.08,
        height: Dimensions.get('window').height,
        paddingTop: 40,
        flexDirection: 'row',
        paddingBottom: 5,
        backgroundColor: '#297885',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.84,
        elevation: 10
    },
    logoutContainer: {
        flex: 1,
        padding: 10
    },
    pillsContainer: {
        flex: 1,
        padding: 10
    },
    calendarContainer: {
        flex: 1,
        padding: 10
    },
    contactsContainer: {
        flex: 1,
        padding: 10
    },

    image : {
        resizeMode: 'contain',
    }

    // pills: {
    //     flex: 1,
    //     resizeMode: 'contain',
    //     alignSelf: 'center'
    // },
    // calendar: {
    //     flex: 1,
    //     resizeMode: 'contain',
    //     alignSelf: 'center'
    // },
    // contacts: {
    //     flex: 1,
    //     resizeMode: 'contain',
    //     alignSelf: 'center'
    // },
    // logout: {
    //     flex: 1,
    //     resizeMode: 'contain',
    //     alignSelf: 'center'
    // }

})

export default styles
