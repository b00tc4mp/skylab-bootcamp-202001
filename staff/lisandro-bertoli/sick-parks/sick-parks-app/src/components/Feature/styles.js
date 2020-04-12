import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    featuresContainer: {
        marginTop: 15,
        marginBottom: 40

    },
    featureContainer: {
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#82A4B3',
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    featureData: {
        fontFamily: 'montserrat',
    },
    featureProp: {
        fontFamily: 'montserrat-semi',
        paddingBottom: 10,
    },

    propContainer: {
        flex: 1,
        justifyContent: 'space-around'

    },

})

export default styles