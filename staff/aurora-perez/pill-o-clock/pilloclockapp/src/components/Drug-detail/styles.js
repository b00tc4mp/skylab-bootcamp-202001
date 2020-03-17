import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    title : {
        fontFamily : 'Sensei-Medium',
        color : '#297885',
        fontSize : 70,
        marginLeft : 20,
        textDecorationLine: 'underline',
    },
    
    header : {
        fontFamily : 'Sensei-Medium',
        color : '#297885',
        fontSize : 40,
        marginLeft : 20,
        marginTop : 30,
        
    },

    container : {
        flex : 1,
        width : '90%',
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 10,
        marginTop : 100
    },

    text : {
        fontFamily : 'Sensei-Medium',
        color : '#4CBBC2',
        fontSize : 30,
        marginLeft : 50,
        marginTop : 15
    },
    
    logo : {
        marginTop : 20,
        width: 150,
        height: 150,
        alignSelf : 'center'   
    
    }

})

export default styles