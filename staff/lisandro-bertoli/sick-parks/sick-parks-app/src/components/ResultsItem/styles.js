import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: 350,
        marginVertical: 10,
        height: 125

    },
    item: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: '#82A4B3',
        borderWidth: 4,
        borderRadius: 5,
        backgroundColor: '#EDF4F9',
    },
    text: {
        color: '#82A4B3',
    },
    textBold: {
        color: '#82A4B3',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1
    },

    image: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    colOne: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'space-between',

    },
    colTwo: {
        justifyContent: "space-between",

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

