import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '90%',
        marginHorizontal: '5%',
        marginTop : 100,
        backgroundColor : '#fffdf9',
        borderRadius : 30,
        padding : 0
    },

    titleContainer : {
        flex : 1,
        width : '100%',
        flexDirection : 'row',
        marginHorizontal: '10%'
    },

    titleLeft : {
        justifyContent: 'center'
    },

    list : {
        flex : 1
    },

    titleStyle : {
        marginTop : 20,
        fontSize : 25,
        color : '#fffdf9',
        alignSelf : 'center',
        backgroundColor : '#297885',
        padding : 15,
        borderRadius : 10,
        overflow: 'hidden',
        fontFamily : 'Sensei-Medium.ttf.ttf'
    },

    text : {
        fontFamily : 'Sensei-Medium.ttf.ttf',
        color : '#297885',
        padding: 10,
        fontSize: 20
    },

    title : {
        fontSize : 30,
        color : '#297885',
        fontFamily : 'Sensei-Medium.ttf.ttf' ,
        alignSelf : 'center',
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