import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    text : {
        fontFamily : 'Sensei-Medium'
    },

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
        color:'#4CBBC2'
    },

    title : {
        fontSize : 50,
        color : '#297885',
        alignSelf : 'center'
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
    },

    toRegister : {
        marginTop : 20,
        fontSize : 15,
        alignSelf : 'center',
        color : '#79BABF'
    },

    error : {
        marginTop : 20,
        padding : 10
    },

    logo : {
        marginTop : 50,
        width: 350,
        height: 350,
        alignSelf : 'center'
        
    }
})

export default styles