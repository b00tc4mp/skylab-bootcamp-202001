import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 30,
        width: '95%',
        marginHorizontal: '2.5%'
    },
    nameHeader: {
        flex: 1,
        flexDirection: 'row'
    },
    picture: {
        flex: 1,
        padding: 0,
        marginHorizontal: 15,
        backgroundColor: 'brown',
        borderRadius: 50
    },
    nameInfo: {
        flex: 3,
        flexDirection: 'column',
    },
    bold: {
        fontWeight: 'bold'
    },
    font: {
        fontSize: 15
    },
    posts: {
        marginVertical: 30
    },
    comments: {
        marginVertical: 30
    },
    bigText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default styles