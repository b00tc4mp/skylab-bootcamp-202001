import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: 30
    },
    headerContainer: {
        flex: 1,
        marginVertical: 0
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    favsContainer: {
        flex: 1,
        marginVertical: 15
    },
    resultsContainer: {
        flex: 1,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row'
    },  
    toiletContainer: {
        marginBottom: 30
    },
    rating: {
        fontSize: 20
    },
    postHeader: {
        fontSize: 22.5,
        fontWeight: 'bold'
    },
    postedAt: {
        fontStyle: 'italic'
    },
    image: {
        width: '100%'
    },
    result: {
        flex: 4
    },
    favContainer: {
        flex: 0.5,
    },
    favButton: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    }
})

export default styles