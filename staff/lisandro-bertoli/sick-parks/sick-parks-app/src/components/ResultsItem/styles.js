import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '17%',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#82A4B3',
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: '#EDF4F9',
    },
    text: {
        color: '#82A4B3',
    },

    image: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    colOne: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'space-around',

    },
    colTwo: {
        marginRight: 5,
        justifyContent: "space-between",
        marginVertical: 8
    },
    true: {
        backgroundColor: 'lightgreen',
        width: 80,
        textAlign: 'center'
    },
    false: {
        backgroundColor: 'orange',
        width: 80,
        textAlign: 'center'
    }
})

export default styles

