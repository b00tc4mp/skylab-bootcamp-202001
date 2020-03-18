import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    topToilets: {
        flex: 1,
        alignSelf: 'baseline',
        marginLeft: '2.5%'
    },
    bold: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    header: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    posts: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    post: {
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: '4%',
    },
    postImage: {
        flex:1,
        width: '100%',
        height: 200
    },
    postContent: {
        flex: 1,
        flexDirection: 'row',
    },
    contentLeft: {
        flex: 1,
    },
    left: {
        fontSize: 18,
    },
    contentRight: {
        flex: 0.25,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    right: {
        fontSize: 30
    },
    mapStyle: {
        width: '95%',
        height: 150,
        marginVertical: 10
    },
})

export default styles