import React from 'react'
import styles from './styles'
import { View, Image, TouchableOpacity, Button, Alert, ImageBackground } from 'react-native'


function NavigationBarTop({ toLogin, toMedication, toProgress, toContacts, toPatients, user }) {
    return (
        <View style={styles.top}>

        <ImageBackground imageStyle={styles.image} style={styles.logoutContainer} source={require('../../../assets/images/logout.png')}>
                <Button title= '' onPress={toLogin} />
        </ImageBackground>
        {
                user.profile === 'patient' && (<>
                <ImageBackground imageStyle={styles.image} style={styles.pillsContainer} source={require('../../../assets/images/pills.png')}>
                        <Button title= '' onPress={toMedication} />
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.calendarContainer} source={require('../../../assets/images/calendar.png')}>
                        <Button title= '' onPress={toProgress} />
                </ImageBackground>

                <ImageBackground imageStyle={styles.image} style={styles.contactsContainer} source={require('../../../assets/images/contacts.png')}>
                        <Button title= '' onPress={toContacts} />
                </ImageBackground>

                </>)
        }       
        {       user.profile === 'pharmacist' && (<>

                <ImageBackground imageStyle={styles.image} style={styles.patientContainer} source={require('../../../assets/images/receipt.png')}>
                        <Button title= '' onPress={toPatients} />
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