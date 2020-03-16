import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    msg: {
        fontSize: 25,
        padding: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    warning: {
        backgroundColor: 'orange'
    },
    error: {
        backgroundColor: 'red'
    }
})

export default styles