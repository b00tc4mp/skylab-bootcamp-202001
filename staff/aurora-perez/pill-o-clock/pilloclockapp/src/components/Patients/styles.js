import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 100,
    backgroundColor: '#fffdf9',
    borderRadius: 30,
    alignSelf: 'center',
  },

  titleText: {
    fontSize: 40,
    color: '#297885',
    fontFamily: 'Sensei-Medium',
    alignSelf: 'center',
    padding: 30,
    textDecorationLine: 'underline',
  },
  
  plus : {
    margin : 20,
    width: 70,
    height: 70,
    alignSelf : 'center' 
  },

  logo : {
    width: 90,
    height: 90,
    marginLeft : 0,
   // marginRight: 100
    paddingTop: 10
  },

  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent : 'flex-start'
  },

  titleRight: {
    alignSelf: 'center',
    marginRight: 100
  }
})

export default styles
