import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    Alert,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform
  } from 'react-native'

function AppLayout() {
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={[styles.container, styles.background]}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.header}>Oso</Text>
          </View>

          <View style={[styles.login, styles.bold]}>
            <View style={styles.loginContainer}>
              <Text style={[styles.loginHeader, styles.bold]}>Login</Text>
              <TextInput placeholder='Username' placeholderTextColor='white' style={styles.input} onChangeText={( username ) => this.setState({ username })}></TextInput>
              <TextInput placeholder='Password' placeholderTextColor='white' style={styles.input}></TextInput>

            </View>

            <View style={styles.loginButtons}>
              <View style={styles.loginLoginButton}>
                <TouchableOpacity>
                  <Button title='Login'  />

                </TouchableOpacity>
              </View>
              <View style={styles.loginRegisterButton}>
                <Button title='Sign Up'  />
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.header}>0</Text>
            <Button title='Count up' />
            <Text style={styles.header}>Alex Park</Text>
          </View>

        </ScrollView>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    header: {
      flex: 1,
      alignItems: 'center',
      fontSize: 60,
      fontWeight: 'bold',
      marginTop: 30
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      flex: 1,
      marginTop: 30,
      marginRight: 10
    },
    login: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25
    },
    loginContainer: {
      flex: 1,
      alignItems: 'center',
      width: '90%',
      marginLeft: '5%',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 10,
      padding: 15,
      backgroundColor: 'brown'
    },
    poop: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    bold: {
      fontSize: 30,
      fontWeight: 'bold'
    },
    input: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      marginTop: 10,
      padding: 5,
      width: '80%'
    },
    loginButtons: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 10,
      width: '80%'
    },
    loginLoginButton: {
      flex: 1,
      marginRight: 10
    },
    loginRegisterButton: {
      flex: 1
    }
  
  })  

export default AppLayout