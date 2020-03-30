import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 50,
    backgroundColor: '#fffdf9',
    borderRadius: 30,
    alignSelf: 'center',
  },

  titleText: {
    fontSize: 60,
    color: '#297885',
    fontFamily: 'Chocolate_DRINK_DEMO',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },

  text : {
    fontFamily : 'Chocolate_DRINK_DEMO',
    color : '#297885',
    padding: 10,
    fontSize: 30
  },
  
  plus : {
    margin : 20,
    width: 70,
    height: 70,
    alignSelf : 'center' 
  },

  logo : {
    width: 60,
    height: 60
  },

  titleContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  titleRight: {
    alignSelf: 'center',
    marginRight: 60
  }
})

export default styles
