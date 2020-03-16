import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 350,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

    },
    input: {
        backgroundColor: '#82A4B3',
        flex: 0.12,
        width: 250,
        color: '#EFEBDA',
        borderRadius: 5,
        alignItems: 'center',
        paddingLeft: 5,
    },
    danger: {
        color: 'red'
    }
})

export default styles