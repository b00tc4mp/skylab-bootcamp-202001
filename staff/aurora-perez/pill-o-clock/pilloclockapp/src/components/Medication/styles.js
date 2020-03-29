import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '90%',
        marginHorizontal: '5%',
        marginTop : 50,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 0
    },

    titleContainer : {
        flex : 1,
        width : '100%',
        flexDirection : 'row',
        marginHorizontal: '4%'
    },

    titleLeft : {
        justifyContent: 'center'
    },

    list : {
        flex : 1
    },

    title : {
        fontSize : 60,
        color : '#297885',
        fontFamily : 'Chocolate_DRINK_DEMO' ,
        //alignSelf : 'center',
        textDecorationLine: 'underline',
    },

    logo : {
        marginTop : 10,
        width: 90,
        height: 90,
        resizeMode : 'contain',
        alignSelf : 'center' ,
        marginBottom : 20  
    },

    plus : {
        margin : 20,
        width: 70,
        height: 70,
        alignSelf : 'center' 
    }
})

export default styles