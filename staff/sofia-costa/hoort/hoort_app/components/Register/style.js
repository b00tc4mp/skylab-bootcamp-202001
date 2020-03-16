import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 40,
        marginBottom: 20,
        color: 'plum'
    },
    subtitle: {
        fontSize: 20,
        marginTop: 30
    },
    query: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        height: 40,
        width: 250,
        fontSize: 25,
        borderRadius: 20,
        borderStyle: "solid",
        borderColor: 'black',
        marginTop: 20

    }
})

export default styles