import React from 'react'
import styles from './styles'
import { View, Image, TouchableOpacity, Button, Alert, ImageBackground } from 'react-native'


function NavigationBarTop({ toLogin, toMedication, toProgress, toContacts }) {
    return (
        <View style={styles.top}>

        <ImageBackground imageStyle={styles.image} style={styles.logoutContainer} source={require('../../../assets/images/logout.png')}>
                <Button title= '' onPress={toLogin} />
        </ImageBackground>

        <ImageBackground imageStyle={styles.image} style={styles.pillsContainer} source={require('../../../assets/images/pills.png')}>
                <Button title= '' onPress={toMedication} />
        </ImageBackground>

        <ImageBackground imageStyle={styles.image} style={styles.calendarContainer} source={require('../../../assets/images/calendar.jpg')}>
                <Button title= '' onPress={toProgress} />
        </ImageBackground>

        <ImageBackground imageStyle={styles.image} style={styles.contactsContainer} source={require('../../../assets/images/contacts.jpg')}>
                <Button title= '' onPress={toContacts} />
        </ImageBackground>
  
        </View>
    )

}

// import React from 'react'
// import { Text, TouchableOpacity } from 'react-native'
// import styles from './styles'

// export default function Button(props) {
//     return (
//         <TouchableOpacity style={styles[props.type]} onPress={props.onPress}>
//             <Text style={styles[props.textStyle]}>{props.text}</Text>
//         </TouchableOpacity>
//     )
// }

export default NavigationBarTop