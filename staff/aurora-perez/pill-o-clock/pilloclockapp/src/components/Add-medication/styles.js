import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    text : {
        fontFamily : 'Sensei-Medium.ttf.ttf',
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
        fontFamily : 'Sensei-Medium.ttf',
        paddingHorizontal : 20,
        fontSize: 20
    },
    
    input : {
        fontFamily : 'Sensei-Medium.ttf',
        marginTop : 30,
        fontSize : 20,
        alignSelf : 'center'
    },

    title : {
        fontFamily : 'Sensei-Medium.ttf',
        fontSize : 50,
        color : '#297885',
        alignSelf : 'center',
        marginBottom : 20
    },
    error : {
        fontFamily : 'Sensei-Medium.ttf',
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