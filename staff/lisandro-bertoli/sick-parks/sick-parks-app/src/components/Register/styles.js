import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 350,
        backgroundColor: '#EDF4F9',
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
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 10
    }
})

export default styles