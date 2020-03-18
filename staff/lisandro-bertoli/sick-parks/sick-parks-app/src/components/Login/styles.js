import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#EDF4F9',
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
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 10
    }
})

export default styles