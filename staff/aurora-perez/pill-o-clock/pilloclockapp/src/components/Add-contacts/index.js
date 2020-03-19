
import React, { Component } from 'react'
import styles from './styles'

import { AppRegistry, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'

export default class ScanScreen extends Component {
  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err))
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
    )
  }
}

AppRegistry.registerComponent('default', () => ScanScreen)
