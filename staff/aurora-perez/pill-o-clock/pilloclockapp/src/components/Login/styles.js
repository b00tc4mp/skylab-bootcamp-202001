import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    container : {
        flex : 1,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 10
    },
    
    input : {
        marginTop : 30,
        fontSize : 17,
        alignSelf : 'center',
        color:'#4CBBC2',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    title : {
        fontSize : 50,
        color : '#297885',
        alignSelf : 'center',
        fontWeight: '200',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },
    
    button : {
        marginTop : 35,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 10,
        borderRadius : 10,
        overflow: 'hidden',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    toRegister : {
        marginTop : 20,
        fontSize : 15,
        alignSelf : 'center',
        color : '#79BABF',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    error : {
        marginTop : 20,
        padding : 10,
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    logo : {
        marginTop : 50,
        width: 350,
        height: 350,
        alignSelf : 'center'
        
    }
})

export default styles