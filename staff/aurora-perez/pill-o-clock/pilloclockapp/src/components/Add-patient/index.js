
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import QR from 'react-native-qrcode-svg'
import QRCode from 'react-native-qrcode-svg'

const AddPatient: () => React$Node = ({user}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan this on your patient's phone to add him or her!</Text>
      <Text style={styles.text}>{user.name} {user.surname}, Pharmacist</Text>
     
      <QRCode
      value= {user.id}
      size={200}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop : 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text : {
      fontFamily : 'Sensei-Medium',
      color : '#297885',
      padding: 10,
      fontSize: 20
  },
})

export default AddPatient