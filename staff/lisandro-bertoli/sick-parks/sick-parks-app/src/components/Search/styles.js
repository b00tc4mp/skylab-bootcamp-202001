import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        margin: 0
    },
    input: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: '16%',
        flex: 0.9,
        paddingLeft: 10,
        backgroundColor: 'white',
        shadowColor: 'white',
        shadowOpacity: 100,
        fontFamily: 'montserrat'

    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#EDF4F9',
        justifyContent: 'space-between'
    },
    topImageContainer: {
        flex: 1.1,
        backgroundColor: '#EFEBDA'

    },
    topImage: {
        opacity: 0.75
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '49.5%',
        height: '48.9%',
        marginBottom: 4
    },
    queryIcon: {
        width: 30,
        height: 30,
        tintColor: '#82A4B3'
    },
    queryButton: {
        paddingLeft: 10,
        backgroundColor: 'white',
        height: '16%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        shadowColor: 'white',
        shadowOpacity: 100
    },
    buttonText: {
        fontFamily: 'montserrat-semi',
        alignSelf: 'center'
    },

    filterButton: {
        height: '100%',
        justifyContent: 'center'
    }
})

export default styles