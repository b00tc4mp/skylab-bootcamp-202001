import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container__all: {
        paddingTop: 50,
        flex: 1,
        position: 'absolute',
        top: 165,
        width: 250,
        backgroundColor: 'rgb(221, 254, 231)',
        zIndex: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        //height: 100,
        //top: 10
    },
    header: {
        flex: 1.5,
        alignSelf: 'center',
    },
    options: {
        flex: 1,
        //flexWrap: 'wrap',
        alignSelf: 'center',
        color: 'rgb(147, 147, 147)',
        height: 70,
        fontSize: 20
        //display: 'flex',
        // overflow: 'visible'
    },
    optionsLight: {
        backgroundColor: 'rgb(239, 255, 244)',
        alignSelf: 'center',
        color: 'rgb(147, 147, 147)',
        height: 70,
        fontSize: 20
    }
})

export default styles