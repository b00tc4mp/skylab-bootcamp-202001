import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    commentContainer: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#82A4B3',
        borderRadius: 5,
        padding: 15,

        backgroundColor: '#EFEBDA',
        justifyContent: 'space-between'
    },

    commentPublisher: {
        fontFamily: 'montserrat-semi'
    },

    commentHeader: {
        paddingBottom: 5,
    },
    commentBody: {
        paddingVertical: 15
    },

    commentBodyText: {
        fontFamily: 'montserrat',
    },
    commentFooter: {
        width: '30%',
        alignSelf: 'flex-end'
    },
    image: {
        width: '100%',
        height: 200
    },
});

export default styles