import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        height: Dimensions.get('window').height,
        justifyContent: 'space-around'
    },
    formContainer: {
        flex: 1.5,
        width: '90%',
        marginHorizontal: '5%',
        alignSelf: 'flex-start'
    },
    image: {
        flex: 0.5,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'flex-start'
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    error: {
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    },
    button: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 20,
        backgroundColor: 'brown',
        padding: 20,
        overflow: 'hidden',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 25
    },
    form: {
        fontSize: 20,
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: 'grey',
        borderRadius: 10
    },
    navButtons: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        flex: 1,
        marginRight: 5
    },
    right: {
        flex: 1.5,
        marginLeft: 5
    },
    leftButton: {
        backgroundColor: '#df7861',
        textAlign: 'center',
        padding: 15,
        borderRadius: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    rightButton: {
        backgroundColor: '#df7861',
        textAlign: 'center',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    bottomRow: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        width: '95%',
        marginHorizontal: '2.5%'
    },
    bottomLeft: {
        flex: 1.25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    contactLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginHorizontal: 10
    },
    bottomRight: {
        flex: 0.75,
        alignItems: 'flex-end'
    },
    bottomRightButton: {
        backgroundColor: 'brown',
        fontSize: 20,
        color: 'white',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold'
    }
})

export default styles