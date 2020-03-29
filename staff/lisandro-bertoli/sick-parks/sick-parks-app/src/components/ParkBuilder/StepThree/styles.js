import { StyleSheet, Dimensions } from 'react-native'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: '#EDF4F9',
        paddingBottom: screenHeight * 0.2,
        width: screenWidth * 0.9,
        paddingTop: 10,
        alignItems: "center",
        alignSelf: 'center'

    },
    innerContainer: {
        flex: 1,
        width: screenWidth * 0.9
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    mapContainer: {
        flex: 0.5,
        height: 100,
        width: '100%',
        alignSelf: 'center',
        paddingBottom: 10,
    },
    details: {
        flex: 0.5,
        height: '35%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    detailsCols: {
        justifyContent: 'space-around'
    },

    nextButton: {
        alignItems: 'center',
        borderColor: '#82A4B3',
        borderWidth: 2,
        backgroundColor: '#EFEBDA',
        padding: 10,
        width: '75%',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        color: '#82A4B3',
        fontFamily: 'montserrat-semi'
    },
    label: {
        fontFamily: 'montserrat-semi'

    },
    text: {
        fontFamily: 'montserrat'
    }

})


export default styles