import React from 'react'
import styles from './styles'
import { View, Text, Image, TouchableOpacity, Button, Alert, ImageBackground } from 'react-native'


function NavigationBarTop({ toLogin, toMedication, toProgress, toContacts, toPatients, user }) {
    return (
        <View style={styles.top}>

        <ImageBackground imageStyle={styles.image} style={styles.logoutContainer} source={require('../../../assets/images/logout.png')}>
                <Text onPress={toLogin}></Text>
        </ImageBackground>
        {
                user.profile === 'patient' && (<>
                <ImageBackground imageStyle={styles.image} style={styles.pillsContainer} source={require('../../../assets/images/pills.png')}>
                        <Text onPress={toMedication}></Text>
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.calendarContainer} source={require('../../../assets/images/calendar.png')}>
                        <Text onPress={toProgress}></Text>
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.contactsContainer} source={require('../../../assets/images/contacts.png')}>
                        <Text onPress={toContacts}></Text>
                </ImageBackground>

                </>)
        }       
        {       user.profile === 'pharmacist' && (<>
                <ImageBackground imageStyle={styles.image} style={styles.contactsContainer} source={require('../../../assets/images/receipt.png')}>
                        <Text onPress={toPatients}></Text>
                </ImageBackground>

              

                </>)
        }
        

        


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