import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        height: Dimensions.get('window').height,
        justifyContent: 'flex-start'
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.84,
        elevation: 10,
    },
    logout: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'brown',
        paddingVertical: 15,
        marginHorizontal: 5,
        color: 'white',
        borderRadius: 15
    },
    query: {
        flex: 2,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'lightgray',
        padding: 5
    },
    search: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'green',
        paddingVertical: 15,
        marginHorizontal: 5,
        color: 'white',
        borderRadius: 15
    }
})

export default styles