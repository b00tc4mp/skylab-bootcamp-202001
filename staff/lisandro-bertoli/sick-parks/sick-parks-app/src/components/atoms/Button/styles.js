import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#EFEBDA',
        width: 250,
        flex: 0.1,
        borderRadius: 5,
        justifyContent: 'center'
    },
    danger: {
        backgroundColor: 'red',
        flex: 0.1,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center'
    },
    good: {
        backgroundColor: 'green',
        flex: 0.1,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center'
    },
    facebook: {
        backgroundColor: '#4267b2',
        flex: 0.15,
        color: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        width: 300,
    },
    anchor: {

    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: '#82A4B3'

    },
    anchor: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 1,
        color: '#82A4B3'

    }
})

export default styles