import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({

    container : {
        flex : 1,
        marginTop : 100,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 30
    },
    
    input : {
        marginTop : 30,
        fontSize : 17,
        color:'#4CBBC2',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    title : {
        fontSize : 50,
        color : '#297885',
        fontWeight: '600',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    button : {
        //marginTop : 35,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 10,
        borderRadius : 10,
        overflow: 'hidden',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    toLogin : {
        marginTop : 20,
        fontSize : 15,
        alignItems : 'center',
        color : '#79BABF',
        fontFamily : 'Chocolate_DRINK_DEMO'
    },

    error : {
        marginTop : 20,
        padding : 10,
        fontFamily : 'Chocolate_DRINK_DEMO'
    }

})

export default styles