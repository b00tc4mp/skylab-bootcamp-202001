import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#EFEBDA',
        width: 200,
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
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: '#82A4B3'

    }
})

export default styles