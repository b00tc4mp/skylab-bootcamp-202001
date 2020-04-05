import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    newCommentContainer: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#82A4B3',
        borderRadius: 5,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    newComment: {
        backgroundColor: '#EFEBDA',
        height: 80,
        fontFamily: 'montserrat',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginTop: 15
    },

    secondaryButton: {
        borderColor: '#82A4B3',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 5,

    },

    buttonText: {
        color: '#82A4B3',
        fontFamily: 'montserrat'

    },
});

export default styles