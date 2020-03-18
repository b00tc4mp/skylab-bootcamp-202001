import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    header : {
        fontFamily : 'Sensei-Medium',
        color : '#297885',
        fontSize : 30,
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
        fontSize : 20,
        marginLeft : 50,
        marginTop : 15
    },
    
    logo : {
        marginTop : 20,
        width: 150,
        height: 150,
        alignSelf : 'center'   
    },
    title : {
        fontFamily : 'Sensei-Medium',
        color : '#297885',
        fontSize : 40,
        marginLeft : 20,
        textDecorationLine: 'underline',
        flex : 3,
        alignSelf: 'center'
    },

    bin : {
        flex: 1
    },
    logoBin : {
        resizeMode: 'contain',
        width:'40%',
        height: '40%',
        flex: 1,
        alignSelf: 'center'
    },
    headerContainer : {
        flex : 0.2,
        flexDirection : 'row'
    }

})

export default styles