'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {
  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Scan your pharmacist's QR code!
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);

// import React, {useState} from 'react'
// import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native'
// //import TimePicker from 'react-time-picker'
// import styles from './styles'

// function AddMedication ({onSubmit, error}) {
//     const [ drug, setDrug ] =useState()
//     const [ hour1, setHour1 ] = useState()
//     const [ min1, setMin1 ] = useState()
//     const [ secondTime, setSecondTime ] =useState(false)
//     const [ hour2, setHour2 ] = useState()
//     const [ min2, setMin2 ] = useState()
//     const [ thirdTime, setThirdTime ] =useState(false)
//     const [ hour3, setHour3 ] = useState()
//     const [ min3, setMin3 ] = useState()
    
//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <Text style = {styles.title}>Add contact</Text>
     
                

//                 {error && <Text style={ styles.error}>{error}</Text>}
                
               
                       
//             </View>
//         </ScrollView>
//     )
// }

// export default AddMedication