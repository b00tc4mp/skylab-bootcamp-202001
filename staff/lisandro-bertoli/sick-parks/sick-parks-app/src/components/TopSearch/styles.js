import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flex: 0.13,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 25,
        backgroundColor: '#82A4B3',
    },
    input: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: '40%',
        flex: 0.7,
        paddingLeft: 10,
        backgroundColor: 'white',


    },
    queryIcon: {
        width: 25,
        height: 25,
        tintColor: '#82A4B3'
    },
    iconContainer: {
        paddingLeft: 10,
        backgroundColor: 'white',
        height: '40.5%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',

    }
})

export default styles