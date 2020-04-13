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
        width: 60,
        padding: 10,
        margin: 10,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        opacity: 0.6
    },
    danger: {
        backgroundColor: 'red'
    },
    warning: {
        backgroundColor: 'orange'
    },
    safe: {
        backgroundColor: 'green'
    },
    sliderContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    slider: {
        width: '65%',
        alignSelf: 'center'
    }
})

export default styles