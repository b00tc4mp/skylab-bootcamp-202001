import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    text : {
        fontFamily : 'Sensei-Medium'
    },

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
        color:'#4CBBC2'
    },

    title : {
        fontSize : 40,
        color : '#297885'
    },

    button : {
        //marginTop : 35,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 10,
        borderRadius : 10,
        overflow: 'hidden'
    },

    toLogin : {
        marginTop : 20,
        fontSize : 15,
        alignItems : 'center',
        color : '#79BABF'
    },

    error : {
        marginTop : 20,
        padding : 10
    }

})

export default styles