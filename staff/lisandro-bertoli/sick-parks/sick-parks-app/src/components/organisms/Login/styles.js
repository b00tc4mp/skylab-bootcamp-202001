import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#82A4B3',
        flex: 0.15,
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