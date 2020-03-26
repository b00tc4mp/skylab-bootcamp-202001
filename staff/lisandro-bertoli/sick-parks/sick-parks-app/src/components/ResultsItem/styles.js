import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: 350,
        marginVertical: 10,


    },
    item: {
        flex: 1,
        padding: 15,
        // height: 140,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: '#82A4B3',
        borderWidth: 4,
        borderRadius: 5,
        backgroundColor: '#EDF4F9',
    },
    text: {
        color: '#82A4B3',
        fontWeight: '500'
    },
    textBold: {
        color: '#82A4B3',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1
    },

    image: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    colOne: {
        flex: 0.65,
        paddingHorizontal: 8,
        justifyContent: 'space-between',

    },
    colTwo: {
        flex: 0.35,
        justifyContent: "space-between",

    },
    true: {
        backgroundColor: 'rgba(0,250,154, 0.7)',
        width: 80,
        textAlign: 'center'
    },
    false: {
        backgroundColor: 'rgba(255,69,0, 0.3)',
        width: 80,
        textAlign: 'center'
    }
})

export default styles

