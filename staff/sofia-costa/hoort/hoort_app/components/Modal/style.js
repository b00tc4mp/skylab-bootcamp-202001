import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(300, 300, 300, 0.5)'
    },
    container_border: {
        backgroundColor: 'white',
        position: 'relative',
        maxHeight: '50%',
        width: '80%',
        borderRadius: 30
    },
    title: {
        textDecorationLine: 'underline',
        color: 'rgb(135, 135, 135)',
        bottom: '67%',
        fontSize: 30,
        zIndex: 20,
        position: 'absolute',
        width: 230,
        flex: 0.05,
        textAlign: 'center'
    },
    button_notPlanted: {
        width: '60%',
        height: '8%',
        position: 'absolute',
        bottom: '55%',
        zIndex: 20,
        tintColor: 'rgb(255, 184, 184)',
    },
    button_planted: {
        width: '60%',
        height: '8%',
        position: 'absolute',
        bottom: '55%',
        zIndex: 20,
        tintColor: 'rgb(126, 194, 144)',
    },
    button_harvest: {
        width: '50%',
        height: '8%',
        position: 'absolute',
        bottom: '55%',
        zIndex: 20,
        tintColor: 'plum',
    },
    state: {
        color: 'white',
        bottom: '57%',
        fontSize: 30,
        zIndex: 20,
        position: 'absolute',
        width: 200,
        flex: 0.05,
        textAlign: 'center'
    }
})

export default styles