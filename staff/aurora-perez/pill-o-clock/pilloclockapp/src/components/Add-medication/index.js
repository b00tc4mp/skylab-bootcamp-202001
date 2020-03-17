import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Picker } from 'react-native'
//import TimePicker from 'react-time-picker'
import styles from './styles'

function AddMedication ({onSubmit, error}) {
    const [ drug, setDrug ] =useState()
    const [ hour1, setHour1 ] = useState()
    const [ min1, setMin1 ] = useState()
    const [ secondTime, setSecondTime ] =useState(false)
    const [ hour2, setHour2 ] = useState()
    const [ min2, setMin2 ] = useState()
    const [ thirdTime, setThirdTime ] =useState(false)
    const [ hour3, setHour3 ] = useState()
    const [ min3, setMin3 ] = useState()
    
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
                        onChangeText={(hour1) => setHour1(hour1)}/>

                    <TextInput style = {styles.hour} maxLength={2} placeholder='minutes'
                        onChangeText={(min1) => setMin1(min1)}/>

                    <Text style = {styles.text} onPress={() => setSecondTime(!secondTime)}>+/-</Text>
                </View>

                

                {secondTime && 
                <View style={styles.hourContainer}>                
                    <Text style = {styles.text}>Select hour: </Text> 
                    <TextInput style = {styles.hour} maxLength={2} placeholder='hour'
                        onChangeText={(hour2) => setHour2(hour2)}/>

                    <TextInput style = {styles.hour} maxLength={2} placeholder='minutes'
                        onChangeText={(min2) => setMin2(min2)}/>
                    <Text style = {styles.text} onPress={() => setThirdTime(!thirdTime)}>+/-</Text>
                </View>}

                {thirdTime && 
                <View style={styles.hourContainer}>                
                    <Text style = {styles.text}>Select hour: </Text> 
                    <TextInput style = {styles.hour} maxLength={2} placeholder='hour'
                        onChangeText={(hour3) => setHour3(hour3)}/>

                    <TextInput style = {styles.hour} maxLength={2} placeholder='minutes'
                        onChangeText={(min3) => setMin3(min3)}/>
                    
                </View>}


                {error && <Text style={ styles.error}>{error}</Text>}
                
                <Text style = {[styles.text, styles.button]} onPress={()=> {
                    !secondTime && onSubmit({drug, hour1, min1}) || 
                    secondTime && !thirdTime && onSubmit({drug, hour1, hour2, min1, min2}) || 
                    thirdTime && onSubmit({drug, hour1, hour2, hour3, min1, min2, min3})
                    
                }}>Add pill!</Text>
                       
            </View>
        </ScrollView>
    )
}

export default AddMedication