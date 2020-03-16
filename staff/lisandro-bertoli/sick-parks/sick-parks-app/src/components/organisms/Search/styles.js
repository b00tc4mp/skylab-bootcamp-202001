import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    input: {
        borderRadius: 5,
        flex: 0.18,
        width: '80%',
        alignContent: 'center',
        backgroundColor: 'white',
        shadowColor: 'white',
        shadowOpacity: 100

    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '49.5%',
        height: '45%',
        marginBottom: 4
    }
})

export default styles