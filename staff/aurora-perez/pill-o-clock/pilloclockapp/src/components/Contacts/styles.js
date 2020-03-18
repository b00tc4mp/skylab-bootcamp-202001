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
    padding: 50,
    textDecorationLine: 'underline',
  },

  logo : {
    width: 40,
    height: 40
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
