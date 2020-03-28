import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    text : {
        fontFamily : 'Chocolate_DRINK_DEMO',
        color : '#297885',
        fontSize : 20,
        marginLeft : 20,
        color: '#4CBBC2'
    },

    container : {
        flex : 1,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 10,
        marginTop : 100
    },

    hourContainer : {
        //marginTop : 50,
        flex : 1,
        flexDirection : 'row',
        
    },

    hour : {
        //fontFamily : 'Chocolate_DRINK_DEMO',
        paddingHorizontal : 20,
        fontSize: 20
    },


    title : {
        fontFamily : 'Chocolate_DRINK_DEMO',
        fontSize : 50,
        color : '#297885',
        alignSelf : 'center',
        marginBottom : 20
    },
    error : {
        fontFamily : 'Chocolate_DRINK_DEMO',
        marginTop : 20,
        padding : 10,
        fontSize: 20
    },
    
    button : {
        marginTop : 35,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 10,
        borderRadius : 10,
        overflow: 'hidden'
    }


})

export default styles