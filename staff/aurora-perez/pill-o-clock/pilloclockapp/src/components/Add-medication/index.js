import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Picker } from 'react-native'
//import TimePicker from 'react-time-picker'
import styles from './styles'

function AddMedication ({onSubmit, error}) {
    const [ drug, setDrug ] =useState()
    const [ hour, setHour ] = useState()
    const [ min, setMin ] = useState()
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style = {styles.title}>Add medication</Text>
                <Text style = {styles.text}>Select name: </Text>
            
                <Picker selectedValue = {drug} onValueChange = {setDrug}>
                <Picker.Item label = "Furosemide" value = "Furosemide" />
                <Picker.Item label = "Adiro" value = "Adiro" />
                <Picker.Item label = "Atorvastatine" value = "Atorvastatine" />
                <Picker.Item label = "Paracetamol" value = "Paracetamol" />
                <Picker.Item label = "Anticonceptive" value = "Anticonceptive" />
                </Picker>

                <View style={styles.hourContainer}>                
                    <Text style = {styles.text}>Select hour: </Text> 
                    <TextInput style = {styles.hour} maxLength={2} placeholder='hour'
                        onChangeText={(hour) => setHour(hour)}/>

                    <TextInput style = {styles.hour} maxLength={2} placeholder='minutes'
                        onChangeText={(min) => setMin(min)}/>
                </View>
                
                {error && <Text style={ styles.error}>{error}</Text>}
                
                <Text style = {[styles.text, styles.button]} onPress={()=> onSubmit({drug, hour, min})}>Add pill!</Text>
                       
            </View>
        </ScrollView>
    )
}

export default AddMedication