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
        marginRight: 15,
        backgroundColor: 'brown',
        borderRadius: 50
    },
    nameInfo: {
        flex: 3,
        flexDirection: 'column',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20
    },
    font: {
        fontSize: 15
    },
    posts: {
        marginVertical: 30
    },
    postsContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        opacity: 0.7,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'grey'
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    postDate: {
        fontStyle: 'italic'
    },
    comments: {
        marginVertical: 30
    },
    bigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    innerPost: {
        flexDirection: 'row',
    },
    postsLeft: {
        flex: 1
    },
    postsLeftComment: {
        flex: 1,
        justifyContent: 'center'
    },
    postsRight: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain'
    },
    commentText: {
        fontStyle: 'italic',
        fontSize: 18
    },
    thumb: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 5
    },
    thumbCount: {
        alignSelf: 'center',
        marginRight: 15
    }
})

export default styles