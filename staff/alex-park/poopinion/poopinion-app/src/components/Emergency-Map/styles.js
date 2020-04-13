import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        height: '100%',
        marginHorizontal: '2.5%'
    },
    mapStyle: {
        width: '100%',
        height: (Dimensions.get('window').height) * 0.75,
        marginTop: '2.5%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '2.5%'

    },
    button: {
        width: '100%',
        padding: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        opacity: 0.7
    },
    danger: {
        backgroundColor: '#df7861'
    },
    warning: {
        backgroundColor: '#df7861'
    },
    safe: {
        backgroundColor: '#df7861'
    },
    sliderContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    slider: {
        width: '90%',
        alignSelf: 'center'
    }
})

export default styles